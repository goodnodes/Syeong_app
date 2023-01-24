import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  FlatList,
} from 'react-native'
import React, {useRef, useState} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import PagerView from 'react-native-pager-view'
import Header from '../../../components/Header/Header'
import BackButton from '../../../components/Button/BackButton'
import {
  caret_down_icon,
  gear_icon,
  pencil_icon_line,
  pin_icon_gray5,
} from '../../../../assets/icons'
import {SyeongColors} from '../../../components/Colors'
import SelectDropdown from 'react-native-select-dropdown'

const MyMainScreen = ({navigation}) => {
  const dummy = [0, 1, 2, 3, 4]
  const pagerRef = useRef<PagerView>()
  const [pagerState, setPagerState] = useState<number>(0)
  const [orderByState, setOrderByState] = useState<string>('최신순')

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar barStyle={'dark-content'} />
      <Header backgroundColor="#FFFFFF">
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <BackButton />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MySettingScreen')
            }}>
            <Image source={gear_icon} style={styles.gear_icon} />
          </TouchableOpacity>
        </View>
      </Header>
      <View style={styles.profileView}>
        <Text style={styles.usernameText}>이름</Text>
        <View style={styles.profileRow}>
          <Text style={styles.subText}>무조건 일주일 1번은 수영장에 가자!</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('EditProfileScreen')
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={pencil_icon_line}
                style={styles.pencil_icon_line}
              />
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
        <ScrollView style={{paddingHorizontal: 20}}>
          <Text
            style={{
              textAlign: 'right',
              marginTop: 16,
              marginBottom: 10,
              color: SyeongColors.gray_4,
              fontSize: 14,
              fontWeight: '500',
              lineHeight: 16.71,
              letterSpacing: -0.41,
            }}>
            2/5
          </Text>
          {dummy.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  backgroundColor: '#FFFFFF',
                  marginVertical: 6,
                  height: 107,
                  padding: 16,
                  borderRadius: 10,
                }}>
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <Text
                  style={{
                    color: SyeongColors.gray_8,
                    fontSize: 16,
                    fontWeight: '600',
                    lineHeight: 19.09,
                    letterSpacing: -0.41,
                    marginBottom: 8,
                  }}>
                  문정교육회관
                </Text>
                                          <TouchableOpacity>
                        <Image
                          source={pin_icon_gray5}
                          style={{width: 24, height: 24}}
                        />
                      </TouchableOpacity>
                  </View>

                <Text
                  style={{
                    color: SyeongColors.gray_4,
                    fontSize: 15,
                    fontWeight: '500',
                    lineHeight: 22,
                    letterSpacing: -0.41,
                  }}>
                  서울시 송파구 어쩌구 저쩌구
                </Text>
              </View>
            )
          })}
        </ScrollView>

        <FlatList
          data={dummy}
          contentContainerStyle={{paddingHorizontal: 20}}
          ListHeaderComponent={
            <View style={{alignItems: 'flex-end',                    marginTop: 16,
                    marginBottom: 11,}}>
              {/* <TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 16,
                    marginBottom: 11,
                  }}>
                  <Text
                    style={{
                      color: SyeongColors.gray_4,
                      fontSize: 15,
                      fontWeight: '600',
                      lineHeight: 17.9,
                      letterSpacing: -0.41,
                      marginRight: 4,
                    }}>
                    최신순
                  </Text>
                  <Image
                    source={caret_down_icon}
                    style={{width: 18, height: 18}}
                  />
                </View>
              </TouchableOpacity> */}

            <SelectDropdown
              data={['최신순','오래된순']}
              onSelect={item => {
                setOrderByState(item)
              }}
              defaultValue={orderByState}
              dropdownOverlayColor={"transparent"}
              buttonStyle={{
                backgroundColor: "transparent",
                width: 88,
                height: 20,
              }}
              buttonTextStyle={{
                      color: SyeongColors.gray_4,
                      fontSize: 15,
                      fontWeight: '600',
                      lineHeight: 17.9,
                      letterSpacing: -0.41,
                      marginRight: 4,
              }}
              dropdownStyle={{
                width: 90,
                height: 90,
                backgroundColor: '#FFFFFF',
                borderRadius: 15,
              }}
              renderCustomizedRowChild={item => {
                return (
                  <View
                    style={{
                      paddingHorizontal: 16,
                      borderColor: '#FFFFFF',
                      borderWidth: 1,
                      height: 50,
                      justifyContent: "center",
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "500",
                        lineHeight: 32,
                        color: SyeongColors.gray_6,
                      }}>
                      {item}
                    </Text>
                  </View>
                )
              }}
            />
                              <Image
                    source={caret_down_icon}
                    style={{width: 18, height: 18, position:'absolute', right: 0}}
                  />
            </View>
          }
          renderItem={() => {
            return (
              <View
                style={{
                  padding: 16,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 10,
                  marginVertical: 6,
                }}>
                <Text
                  style={{
                    color: SyeongColors.gray_8,
                    fontSize: 16,
                    fontWeight: '600',
                    lineHeight: 19.09,
                    letterSpacing: -0.41,
                    marginBottom: 8,
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
                    marginBottom: 20,
                  }}>
                  서울 송파구 어쩌구 저쩌구
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginBottom: 16,
                  }}>
                  {dummy.map((item, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          backgroundColor: SyeongColors.gray_1,
                          paddingHorizontal: 13,
                          paddingVertical: 9.5,
                          borderRadius: 8,
                          marginVertical: 4,
                          marginRight: 4,
                        }}>
                        <Text
                          style={{
                            color: SyeongColors.gray_8,
                            fontSize: 14,
                            fontWeight: '500',
                            lineHeight: 16.71,
                            letterSpacing: -0.41,
                          }}>
                          깨끗한 물
                        </Text>
                      </View>
                    )
                  })}
                </View>
                <Text
                  style={{
                    color: SyeongColors.gray_6,
                    fontSize: 14,
                    fontWeight: '500',
                    lineHeight: 22,
                    letterSpacing: -0.41,
                    marginBottom: 12,
                  }}>
                  채광도 잘 들어오고 수영장 시설도 깔끔해서 일주일에 3번은 꼭
                  출석하고 있어요! 추천!!
                </Text>
                <Text
                  style={{
                    color: SyeongColors.gray_4,
                    fontSize: 14,
                    fontWeight: '500',
                    lineHeight: 22,
                    letterSpacing: -0.41,
                  }}>
                  22.12.7.수
                </Text>
              </View>
            )
          }}
        />
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
  pencil_icon_line: {width: 20, height: 20, marginRight: 4},
  buttonRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-around',
    borderTopColor: SyeongColors.gray_2,
    borderTopWidth: 0.7,
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
