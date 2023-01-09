import React, {useState} from 'react'
import {
  Image,
  ImageBackground,
  ListRenderItem,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {useRecoilValue} from 'recoil'
import {
  caret_down_icon,
  caret_up_linear_gradient,
  map_icon,
  search_icon_white,
  syeong_logo,
  user_icon,
} from '../../../../assets/icons'
import {home_background} from '../../../../assets/images'
import {poolAtom} from '../../../atoms/pool'
import {SyeongColors} from '../../../components/Colors'
import PoolListItem, {PoolData} from '../../../components/ListItem/PoolListItem'

const HomeMainScreen = ({navigation, route}) => {
  // console.log(route.params)
  const dummy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const [iconState, setIconState] = useState<boolean>(false)
  const poolData = useRecoilValue(poolAtom)

  const insets = useSafeAreaInsets()
  const offset = useSharedValue(0)

  const animatedStyles = useAnimatedStyle(() => {
    const scale = interpolate(offset.value, [0, 560], [70, -70], {
      extrapolateLeft: Extrapolation.CLAMP,
      extrapolateRight: Extrapolation.CLAMP,
    })
    return {transform: [{translateY: scale}]}
  })

  const scrollHandler = useAnimatedScrollHandler(event => {
    offset.value = event.contentOffset.y
    if (event.contentOffset.y > 340) runOnJS(setIconState)(true)
    else runOnJS(setIconState)(false)
  })

  const renderFirstItem = () => {
    return (
      <View>
        <Animated.View
          style={[
            {
              width: '100%',
              height: 85,
              backgroundColor: SyeongColors.gray_1,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              position: 'absolute',
              top: 70,
            },
            animatedStyles,
          ]}
        />
        <View style={styles.myPool}>
          <View style={styles.myPoolTitle}>
            <Text style={styles.myPoolText}>🏊‍♀️ 나의 고정 수영장</Text>
            <Text style={styles.myPoolSubText}>2/5</Text>
          </View>
          <View style={{marginVertical: 16}}>
            <ScrollView
              indicatorStyle="white"
              horizontal
              contentContainerStyle={{paddingHorizontal: 20}}>
              {dummy.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      width: 324, //device 크기로 변환
                      height: 107,
                      backgroundColor: '#FFFFFF',
                      borderRadius: 10,
                      marginRight: 8,
                      marginBottom: 10,
                      paddingTop: 16,
                      paddingLeft: 16
                    }}>
                    <Text
                      style={{
                        color: SyeongColors.gray_8,
                        fontSize: 16,
                        fontWeight: '600',
                        lineHeight: 19.09,
                        letterSpacing: -0.41,
                        marginBottom: 8
                      }}>
                      문정교육회관
                    </Text>
                    <Text
                      style={{
                        color: SyeongColors.gray_4,
                        fontSize: 15,
                        fontWeight: '500',
                        lineHeight: 22,
                        letterSpacing: -0.41,
                      }}>
                      서울 송파구 어쩌구 저쩌구
                    </Text>
                  </View>
                )
              })}
            </ScrollView>
          </View>
        </View>
        <View style={styles.poolListTitle}>
          <TouchableOpacity>
            <View style={styles.poolListButton}>
              <Image source={map_icon} style={styles.map_icon} />
              <Text style={styles.regionText}>송파구</Text>
              <Image source={caret_down_icon} style={styles.caret_down} />
            </View>
          </TouchableOpacity>
          <Text style={styles.mediumText}>모든 수영장 12</Text>
        </View>
      </View>
    )
  }

  const renderListHeaderItem = () => {
    return (
      <View>
        <View style={{marginTop: 136, alignItems: 'center'}}>
          <Image source={syeong_logo} style={styles.syeong_logo} />
          <Text style={styles.smallText}>
            셩과 당신의 하루를 위해{'\n'}서울 곳곳의 수영장 맛집을 알려드려요!
          </Text>
          <Image source={caret_up_linear_gradient} style={styles.caret_up} />
        </View>
      </View>
    )
  }

  const renderFlatListItem: ListRenderItem<PoolData> = ({item, index}) => {
    if (index === 0) {
      return renderFirstItem()
    }
    return (
      <View
        style={{backgroundColor: SyeongColors.gray_1, paddingHorizontal: 20}}>
        <PoolListItem data={item} />
      </View>
    )
  }
  return (
    <View style={styles.view}>
      <StatusBar barStyle={iconState ? 'dark-content' : 'light-content'} />
      <ImageBackground source={home_background} style={styles.imageBackground}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SearchMainScreen')
          }}
          style={{zIndex: 10}}>
          <Image
            source={search_icon_white}
            style={[
              {
                width: 24,
                height: 24,
                position: 'absolute',
                top: insets.top + 7,
                left: 20,
              },
              iconState ? {tintColor: SyeongColors.gray_8} : null,
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MyMainScreen')
          }}
          style={{zIndex: 10}}>
          <Image
            source={user_icon}
            style={[
              {
                width: 24,
                height: 24,
                position: 'absolute',
                top: insets.top + 7,
                right: 20,
              },
              iconState ? {tintColor: SyeongColors.gray_8} : null,
            ]}
          />
        </TouchableOpacity>
        <Animated.FlatList
          data={poolData}
          renderItem={renderFlatListItem}
          stickyHeaderIndices={[1]}
          onScroll={scrollHandler}
          ListHeaderComponent={renderListHeaderItem()}
        />
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {flex: 1},
  imageBackground: {flex: 1},
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  myPool: {
    backgroundColor: SyeongColors.gray_1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingTop: 26,
    marginTop: 70,
  },
  myPoolTitle: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  myPoolText: {
    color: SyeongColors.gray_8,
    fontWeight: '600',
    fontSize: 17,
    lineHeight: 20.29,
    letterSpacing: -0.41,
  },
  myPoolSubText: {
    color: SyeongColors.gray_4,
    fontSize: 14,
    lineHeight: 16.71,
    letterSpacing: -0.41,
    fontWeight: '500',
  },
  poolListTitle: {
    backgroundColor: SyeongColors.gray_1,
    paddingTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
  },
  poolListButton: {flexDirection: 'row', alignItems: 'center'},
  map_icon: {width: 20, height: 20, marginRight: 4},
  regionText: {
    color: SyeongColors.gray_6,
    fontWeight: '600',
    fontSize: 17,
    lineHeight: 20.29,
    letterSpacing: -0.41,
  },
  syeong_logo: {width: 124.04, height: 127.07},
  smallText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 15,
    lineHeight: 21,
    letterSpacing: -0.41,
    fontWeight: '500',
    marginTop: 31.39,
    marginBottom: 15,
  },
  caret_up: {width: 32, height: 32},
  caret_down: {width: 18, height: 18, marginLeft: 2, marginRight: 4},
  mediumText: {
    color: SyeongColors.gray_6,
    fontWeight: '600',
    fontSize: 17,
    lineHeight: 20.29,
    letterSpacing: -0.41,
  },
})

export default HomeMainScreen
