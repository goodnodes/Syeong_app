import React from 'react'
import {
  Dimensions,
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
  interpolateColor,
  interpolateColors,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {
  clipboard_icon,
  map_icon_main3,
  pencil_icon,
  phone_icon,
  pin_icon_gray1,
  share_icon,
} from '../../../assets/icons'
import BackButton from '../../components/Button/BackButton'
import BasicButton from '../../components/Button/BasicButton'
import {SyeongColors} from '../../components/Colors'
import Header from '../../components/Header/Header'
import Image from '../../components/Image/Image'
import ReviewBadgeComponent from './ReviewBadgeComponent'
import ReviewItem from './ReviewItem'

const SearchDetailScreen = ({navigation, route}) => {
  const dummy = {
    title: '문정교육회관',
    location: '서울 송파구 어쩌구 저쩌구',
    call: '010-333-3333',
    picture:
      'https://poi-kyeongseo.com/data/file/yp_program02/1/3698681510_yJgMAXjf_34d98a86196acca842ab0a00977db226616226a2.jpg',
    review: [
      {
        name: 'dd',
        content: '채광이 잘 들어오고 어쩌구 저쩌구',
        createdAt: '22.13.32 수',
        tag: ['깨끗한 물', '청결한 샤워실', '편리한 센터 이용'],
      },
      {
        name: 'dd',
        content: '채광이 잘 들어오고 어쩌구 저쩌구',
        createdAt: '22.13.32 수',
        tag: ['깨끗한 물', '청결한 샤워실', '편리한 센터 이용'],
      },
      {
        name: 'dd',
        content: '채광이 잘 들어오고 어쩌구 저쩌구',
        createdAt: '22.13.32 수',
        tag: ['깨끗한 물', '청결한 샤워실', '편리한 센터 이용'],
      },
    ],
  }
  const offset = useSharedValue(0)
  const insets = useSafeAreaInsets()

  const animatedColor = Animated.interpolateColors(offset.value, {
    inputRange: [0, 250],
    outputColorRange: ['transparent', '#FFFFFF'],
  })

  const scrollHandler = useAnimatedScrollHandler(event => {
    offset.value = event.contentOffset.y
    // console.log(event.contentOffset.y)
  })
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle={'light-content'} />
      <Animated.View
        style={[
          {
            marginTop: insets.top,
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'space-between',
            zIndex: 10,
            position: 'absolute',
            paddingHorizontal: 20,
            width: '100%',
            top: -47,
            height: 123,
            paddingTop: insets.top,
          },
          {backgroundColor: animatedColor},
        ]}>
        <BackButton isLight />
        <View style={{flexDirection: 'row', alignContent: 'center'}}>
          <TouchableOpacity>
            <Image
              source={share_icon}
              style={{width: 24, height: 24, marginRight: 16}}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={pin_icon_gray1} style={{width: 24, height: 24}} />
          </TouchableOpacity>
        </View>
      </Animated.View>
      <Image
        source={{uri: dummy.picture}}
        style={{
          width: '100%',
          height: Dimensions.get('window').height / 2.5,
          zIndex: -10,
          position: 'absolute',
        }}
      />
      <Animated.ScrollView
        style={{
          flex: 1,
        }}
        onScroll={scrollHandler}
        scrollEventThrottle={16}>
        <View
          style={{
            backgroundColor: 'white',
            marginTop: 300,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            flex: 1,
            paddingHorizontal: 20,
          }}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{dummy.title}</Text>
            <View style={styles.laneBadge}>
              <Text style={styles.laneBadgeText}>25m</Text>
            </View>
            <View style={styles.numberBadge}>
              <Text style={styles.numberBadgeText}>6</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.rowAlignCenter}>
              <Image source={map_icon_main3} style={styles.map_icon_main3} />
              <Text
                style={{
                  color: SyeongColors.gray_5,
                  fontSize: 15,
                  fontWeight: '500',
                  lineHeight: 22,
                  letterSpacing: -0.41,
                  marginRight: 4,
                }}>
                {dummy.location}
              </Text>
              <Image source={clipboard_icon} style={styles.map_icon_main3} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={styles.rowAlignCenter}>
                <Image source={phone_icon} style={styles.map_icon_main3} />
                <Text
                  style={{
                    color: SyeongColors.main_4,
                    fontSize: 15,
                    fontWeight: '500',
                    lineHeight: 22,
                    letterSpacing: -0.41,
                    marginRight: 4,
                  }}>
                  {dummy.call}
                </Text>

                <Image source={clipboard_icon} style={styles.map_icon_main3} />
              </View>
              <TouchableOpacity>
                <Text
                  style={{
                    color: SyeongColors.gray_4,
                    fontSize: 14,
                    fontWeight: '500',
                    lineHeight: 16.71,
                    letterSpacing: -0.41,
                  }}>
                  정보 수정 제안하기
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.freeInfo}>
            <Text
              style={{
                color: SyeongColors.gray_7,
                fontWeight: '600',
                fontSize: 15,
                lineHeight: 17.9,
                letterSpacing: -0.41,
              }}>
              🏊‍♀️ 자유 수영이 하고 싶을 땐
            </Text>
            <BasicButton
              text="자유 수영 보러가기"
              backgroundColor={SyeongColors.main_3}
              textColor={SyeongColors.gray_1}
              onPress={() => {}}
              width={143}
              height={36}
              borderRadius={8}
              borderColor={SyeongColors.sub_3}
              textSize={16}
              borderWidth={1}
            />
          </View>
          <View style={styles.reviewContainer}>
            <View style={styles.reviewTitleRow}>
              <View style={styles.rowAlignCenter}>
                <Text style={styles.reviewTitle}>수영장 리뷰 </Text>
                <Text style={styles.reviewNum}>12</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('WriteReviewScreen', {
                    data: {title: dummy.title},
                  })
                }}>
                <View style={styles.rowAlignCenter}>
                  <Image source={pencil_icon} style={styles.pencil_icon} />
                  <Text style={styles.plainText}>리뷰 작성하기</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.reviewContainer}>
              <ReviewBadgeComponent
                prize={1}
                reviewNum={10}
                content={'청결한 샤워실'}
              />
              <ReviewBadgeComponent
                prize={2}
                reviewNum={8}
                content={'깨끗한 물'}
              />
              <View style={styles.reviewList}>
                <ReviewItem review={dummy.review[0]} />
                <ReviewItem review={dummy.review[1]} />
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ReviewDetailScreen', {data: dummy})
                  }}>
                  <Text
                    style={{
                      marginTop: 16,
                      marginBottom: 24,
                      textAlign: 'center',
                      color: SyeongColors.gray_5,
                      fontSize: 15,
                      fontWeight: '600',
                      lineHeight: 32,
                    }}>
                    리뷰 더보기
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.freeInfo}>
            <Text
              style={{
                color: SyeongColors.gray_7,
                fontWeight: '600',
                fontSize: 15,
                lineHeight: 17.9,
                letterSpacing: -0.41,
              }}>
              수영 강습을 받고 싶나요?
            </Text>
            <BasicButton
              text="강습 정보 보러가기"
              backgroundColor={SyeongColors.main_3}
              textColor={SyeongColors.gray_1}
              onPress={() => {}}
              width={143}
              height={36}
              borderRadius={8}
              borderColor={SyeongColors.sub_3}
              textSize={16}
              borderWidth={1}
            />
          </View>
          <View style={styles.locationView}>
            <Text style={styles.reviewTitle}>수영장 지도</Text>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: 'row',
    marginTop: 36,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 21.48,
    letterSpacing: -0.41,
    color: SyeongColors.gray_8,
  },
  laneBadge: {
    backgroundColor: SyeongColors.sub_4,
    paddingVertical: 1,
    paddingHorizontal: 7,
    borderRadius: 999,
    position: 'absolute',
    right: 20,
    zIndex: 10,
  },
  laneBadgeText: {
    color: SyeongColors.gray_1,
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: -0.41,
    lineHeight: 22.4,
  },
  numberBadge: {
    backgroundColor: SyeongColors.gray_1,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: SyeongColors.sub_4,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberBadgeText: {
    color: SyeongColors.sub_4,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 16.71,
    letterSpacing: -0.35,
  },
  infoRow: {marginBottom: 42},
  map_icon_main3: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
  rowAlignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  freeInfo: {
    backgroundColor: SyeongColors.gray_1,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 22,
    marginBottom: 37,
  },
  reviewContainer: {marginBottom: 24},
  reviewTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 13,
  },
  reviewTitle: {
    color: SyeongColors.gray_8,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 19.09,
    letterSpacing: -0.41,
  },
  reviewNum: {
    color: SyeongColors.gray_6,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 19.09,
    letterSpacing: -0.41,
  },
  pencil_icon: {width: 20, height: 20, marginRight: 4},
  plainText: {
    color: SyeongColors.gray_6,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: -0.41,
  },
  reviewList: {
    backgroundColor: SyeongColors.gray_1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginTop: 4,
  },
})

export default SearchDetailScreen
