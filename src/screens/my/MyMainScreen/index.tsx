import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native'
import React, {useRef, useState} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import PagerView from 'react-native-pager-view'
import Header from '../../../components/Header/Header'
import BackButton from '../../../components/Button/BackButton'
import {gear_icon, pencil_icon} from '../../../../assets/icons'
import {SyeongColors} from '../../../components/Colors'

const MyMainScreen = ({navigation}) => {

  const pagerRef = useRef<PagerView>()
  const [pagerState, setPagerState] = useState<number>(0)

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar barStyle={'dark-content'} />
      <Header backgroundColor="#FFFFFF">
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <BackButton />
          <TouchableOpacity onPress={()=>{navigation.navigate('MySettingScreen')}}>
            <Image source={gear_icon} style={styles.gear_icon} />
          </TouchableOpacity>
        </View>
      </Header>
      <View style={styles.profileView}>
        <Text style={styles.usernameText}>이름</Text>
        <View style={styles.profileRow}>
          <Text style={styles.subText}>무조건 일주일 1번은 수영장에 가자!</Text>
          <TouchableOpacity onPress={()=>{navigation.navigate('EditProfileScreen')}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={pencil_icon} style={styles.pencil_icon} />
              <Text style={styles.smallText}>프로필 편집</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          onPress={() => {
            pagerRef.current.setPage(0)
          }}
          style={styles.pagerButton}>
          <Text
            style={[
              styles.pagerButtonText,
              pagerState !== 0 ? styles.subPagerButtonText : null,
            ]}>
            나의 수영장
          </Text>
          {pagerState === 0 && <View style={styles.pagerBar} />}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            pagerRef.current.setPage(1)
          }}
          style={styles.pagerButton}>
          <Text
            style={[
              styles.pagerButtonText,
              pagerState !== 1 ? styles.subPagerButtonText : null,
            ]}>
            리뷰
          </Text>
          {pagerState === 1 && <View style={styles.pagerBar} />}
        </TouchableOpacity>
      </View>
      <PagerView
        ref={pagerRef}
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={e => {
          setPagerState(e.nativeEvent.position)
        }}>
        <View >
          <Text>First page</Text>
        </View>
        <View>
<View>
  <TouchableOpacity>
    <View>
      <Text>최신순</Text>

    </View>
  </TouchableOpacity>

</View>
        </View>
      </PagerView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  profileView: {
    paddingTop: 48,
    paddingHorizontal: 20,
    paddingBottom: 37,
  },
  usernameText: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 23.87,
    letterSpacing: -0.41,
    color: SyeongColors.gray_8,
    marginBottom: 8,
  },
  profileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subText: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 17.9,
    letterSpacing: -0.41,
    color: SyeongColors.gray_4,
  },
  gear_icon: {
    width: 24,
    height: 24,
  },
  smallText: {
    fontSize: 15,
    lineHeight: 17.9,
    letterSpacing: -0.41,
    fontWeight: '500',
    color: SyeongColors.gray_6,
  },
  pagerView: {
    flex: 1,
    backgroundColor: SyeongColors.gray_1,
  },
  pencil_icon: {width: 20, height: 20, marginRight: 4},
  buttonRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-around',
    borderTopColor:SyeongColors.gray_2,
  borderTopWidth:0.7
  },
  pagerButton: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pagerBar: {
    width: 76,
    height: 4,
    borderRadius: 8,
    backgroundColor: SyeongColors.sub_3,
  },
  pagerButtonText: {
    fontSize: 17,
    lineHeight: 20.29,
    letterSpacing: -0.41,
    fontWeight: '600',
    color: SyeongColors.gray_8,
    height: 50,
    paddingTop: 18,
  },
  subPagerButtonText: {
    color: SyeongColors.gray_4,
  },
})

export default MyMainScreen
