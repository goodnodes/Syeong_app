import {useFocusEffect} from "@react-navigation/native"
import React, {useCallback, useEffect, useRef, useState} from "react"
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ListRenderItem,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated"
import {useSafeAreaInsets} from "react-native-safe-area-context"
import SelectDropdown from "react-native-select-dropdown"
import {useRecoilState, useRecoilValue} from "recoil"
import {
  caret_down_icon,
  caret_up_linear_gradient,
  map_icon,
  pin_icon_sub4,
  push_pin_simple_icon,
  search_icon_white,
  syeong_logo,
  traffic_cone_icon,
  user_icon,
} from "../../../../assets/icons"
import {landing_background} from "../../../../assets/images"
import {regionData} from "../../../../assets/static/region"
import {authAtom, user} from "../../../atoms/auth"
import {pool, PoolType} from "../../../atoms/pool"
import {SyeongColors} from "../../../components/Colors"
import SyeongStatusBar from "../../../components/Header/SyeongStatusBar"
import PoolListItem from "../../../components/ListItem/PoolListItem"
import DoubleModal from "../../../components/Modal/DoubleModal"
import {useMyPoolAdd, useMyPoolDelete} from "../../../hooks/useMyPool"
import {useUserAtomUpdate} from "../../../hooks/useUserAtom"

const HomeMainScreen = ({navigation, route}) => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(authAtom)
  const [userAtom, setUserAtom] = useRecoilState(user)
  const [poolAtom, setPool] = useRecoilState(pool)
  const [iconState, setIconState] = useState<boolean>(false)
  const [isLoginModalVisible, setIsLoginModalVisible] = useState<boolean>(false)
  const [selectedRegion, setSelectedRegion] = useState<string>(regionData[0])
  const [myPoolData, setMyPoolData] = useState<PoolType[]>([])
  const [displayPoolData, setDisplayPoolData] = useState<PoolType[]>(poolAtom)
  const flatListRef = useRef<FlatList>()

  useFocusEffect(
    useCallback(() => {
      if(!isLoggedIn) return
      useUserAtomUpdate()
    }, []),
  )

  useEffect(() => {
    if (!isLoggedIn) return
    const poolData = poolAtom.filter(el => {
      return userAtom.mypools?.includes(el._id)
    })
    if (poolData.length === 0) setMyPoolData([])
    setMyPoolData(poolData)
  }, [userAtom.mypools])

  useEffect(() => {
    setDisplayPoolData(poolAtom.filter(el => el.region === selectedRegion))
  }, [selectedRegion, poolAtom])

  const insets = useSafeAreaInsets()
  const offset = useSharedValue(0)

  // const animatedStyles = useAnimatedStyle(() => {
  //   const scale = interpolate(offset.value, [0, 560], [70, -70], {
  //     extrapolateLeft: Extrapolation.CLAMP,
  //     extrapolateRight: Extrapolation.CLAMP,
  //   })
  //   return {transform: [{translateY: scale}]}
  // })

  const scrollHandler = useAnimatedScrollHandler(event => {
    offset.value = event.contentOffset.y
    if (event.contentOffset.y > 150) runOnJS(setIconState)(true)
    else runOnJS(setIconState)(false)
  })

  const animatedOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(offset.value, [100, 250], [0, 1], {
      extrapolateLeft: Extrapolation.CLAMP,
      extrapolateRight: Extrapolation.CLAMP,
    })
    return {opacity}
  })

  const animatedOpacityReverse = useAnimatedStyle(() => {
    const opacity = interpolate(offset.value, [0, 100], [1, 0], {
      extrapolateLeft: Extrapolation.CLAMP,
      extrapolateRight: Extrapolation.CLAMP,
    })
    return {opacity}
  })

  const onPressPin = async (poolid: string) => {
    if (userAtom.mypools?.includes(poolid)) {
      await useMyPoolDelete(poolid)
    } else {
      await useMyPoolAdd(poolid)
    }
  }

  const renderFirstItem = () => {
    return (
      <>
        <View style={styles.myPool}>
          <View style={styles.myPoolTitle}>
            <Text style={styles.myPoolText}>🏊‍♀️ 나의 고정 수영장</Text>
            <Text style={styles.myPoolSubText}>{myPoolData.length}/5</Text>
          </View>
          <View style={{marginVertical: 16}}>
            {myPoolData.length === 0 ? (
              <View style={{width: "100%"}}>
                <View
                  style={{
                    height: 107,
                    marginHorizontal: 16,
                    borderColor: SyeongColors.gray_2,
                    borderWidth: 1.5,
                    borderRadius: 10,
                    borderStyle: "dashed",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  }}>
                  <Image
                    source={push_pin_simple_icon}
                    style={{width: 24, height: 24, marginRight: 8}}
                  />
                  <Text
                    style={{
                      color: SyeongColors.gray_4,
                      fontSize: 15,
                      fontWeight: "600",
                      lineHeight: 22,
                      letterSpacing: -0.41,
                    }}>
                    자주 가는 수영장을 고정해보세요!
                  </Text>
                </View>
              </View>
            ) : (
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal
                contentContainerStyle={{paddingHorizontal: 20}}>
                {myPoolData.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        navigation.navigate("SearchDetailScreen", {item: item})
                      }}>
                      <View
                        style={{
                          width:
                            myPoolData.length === 1
                              ? Dimensions.get("screen").width - 40
                              : Dimensions.get("screen").width * 0.8, //device 크기로 변환
                          height: 107,
                          backgroundColor: "#FFFFFF",
                          borderRadius: 10,
                          marginRight: 8,
                          marginBottom: 10,
                          paddingTop: 16,
                          paddingHorizontal: 16,
                        }}>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 8,
                          }}>
                          <Text
                            style={{
                              color: SyeongColors.gray_8,
                              fontSize: 16,
                              fontWeight: "600",
                              lineHeight: 19.09,
                              letterSpacing: -0.41,
                            }}>
                            {item.name}
                          </Text>
                          <TouchableOpacity
                            onPress={() => {
                              onPressPin(item._id)
                            }}>
                            <Image
                              source={pin_icon_sub4}
                              style={{width: 24, height: 24}}
                            />
                          </TouchableOpacity>
                        </View>

                        <Text
                          numberOfLines={1}
                          style={{
                            color: SyeongColors.gray_4,
                            fontSize: 15,
                            fontWeight: "500",
                            lineHeight: 22,
                            letterSpacing: -0.41,
                          }}>
                          {item.address}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )
                })}
              </ScrollView>
            )}
          </View>
        </View>
        <View style={styles.poolListTitle}>
          <View style={styles.poolListButton}>
            <Image source={map_icon} style={styles.map_icon} />

            <SelectDropdown
              data={regionData}
              onSelect={item => {
                setSelectedRegion(item)
              }}
              defaultValue={selectedRegion}
              dropdownOverlayColor={"transparent"}
              buttonStyle={{
                backgroundColor: "transparent",
                width: 88,
                height: 20,
              }}
              buttonTextStyle={{
                fontWeight: "600",
                fontSize: 17,
                lineHeight: 20.29,
                letterSpacing: -0.41,
                color: SyeongColors.gray_6,
              }}
              dropdownStyle={{
                width: 120,
                height: 280,
                backgroundColor: "#FFFFFF",
                borderRadius: 15,
              }}
              renderCustomizedRowChild={item => {
                return (
                  <View
                    style={{
                      paddingHorizontal: 16,
                      borderColor: "#FFFFFF",
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
            <Image source={caret_down_icon} style={styles.caret_down} />
          </View>
          <Text style={styles.mediumText}>
            모든 수영장 {displayPoolData.length}
          </Text>
        </View>
      </>
    )
  }

  const renderListHeaderItem = () => {
    return (
      <>
        <View
          style={{
            marginTop: Dimensions.get("screen").height * 0.18,
            alignItems: "center",
          }}>
          <Image source={syeong_logo} style={styles.syeong_logo} />
          <Text style={styles.smallText}>
            {!userAtom.privateinfo.goal
              ? `셩과 함께\n즐거운 수영 생활을 시작해볼까요?`
              : userAtom.privateinfo.goal}
          </Text>
          <Animated.View style={[animatedOpacityReverse]}>
            <Image source={caret_up_linear_gradient} style={styles.caret_up} />
          </Animated.View>
        </View>

        {renderFirstItem()}
      </>
    )
  }
  const renderFlatListItem: ListRenderItem<PoolType> = ({item, index}) => {
    return (
      <View
        style={{backgroundColor: SyeongColors.gray_1, paddingHorizontal: 20}}>
        <PoolListItem data={item} />
      </View>
    )
  }

  return (
    <View style={styles.view}>
      <StatusBar
        barStyle={
          Platform.OS === "android"
            ? "light-content"
            : iconState
            ? "dark-content"
            : "light-content"
        }
      />
      <ImageBackground
        source={landing_background}
        style={styles.imageBackground}
        imageStyle={{height: 510}}>
        <Animated.View
          style={[
            {
              width: "100%",
              paddingHorizontal: 20,
              alignItems: "center",
              zIndex: 20,
              position: "absolute",
              top: 0,
              height: insets.top + 44,
              paddingTop: insets.top + 7,
              backgroundColor: SyeongColors.gray_1,
              flexDirection: "row",
              justifyContent: "space-between",
              shadowColor: "#8B95A199",
              shadowOffset: {
                width: 0,
                height: 6,
              },
              shadowOpacity: 0.57,
              shadowRadius: 5,

              elevation: 10,
            },
            animatedOpacity,
          ]}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SearchMainScreen")
            }}
            style={{zIndex: 10}}>
            <Image
              source={search_icon_white}
              style={[
                {
                  width: 24,
                  height: 24,
                },
                iconState ? {tintColor: SyeongColors.gray_8} : null,
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (!isLoggedIn) {
                setIsLoginModalVisible(true)
              } else {
                navigation.navigate("MyMainScreen")
              }
            }}>
            <Image
              source={user_icon}
              style={[
                {
                  width: 24,
                  height: 24,
                },
                iconState ? {tintColor: SyeongColors.gray_8} : null,
              ]}
            />
          </TouchableOpacity>
        </Animated.View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SearchMainScreen")
          }}
          style={{zIndex: 10}}>
          <Image
            source={search_icon_white}
            style={[
              {
                width: 24,
                height: 24,
                position: "absolute",
                top: insets.top + 12,
                left: 20,
              },
              iconState ? {tintColor: SyeongColors.gray_8} : null,
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (!isLoggedIn) {
              setIsLoginModalVisible(true)
            } else {
              navigation.navigate("MyMainScreen")
            }
          }}
          style={{zIndex: 10}}>
          <Image
            source={user_icon}
            style={[
              {
                width: 24,
                height: 24,
                position: "absolute",
                top: insets.top + 12,
                right: 20,
                zIndex: 100,
              },
              iconState ? {tintColor: SyeongColors.gray_8} : null,
            ]}
          />
        </TouchableOpacity>
        <Animated.FlatList
          data={displayPoolData}
          renderItem={renderFlatListItem}
          onScroll={scrollHandler}
          ListHeaderComponent={renderListHeaderItem()}
          contentContainerStyle={{
            paddingBottom: 30,
          }}
          // style={{backgroundColor: SyeongColors.gray_1}}
          // ListHeaderComponentStyle={{backgroundColor: "transparent"}}
          ref={flatListRef}
        />
      </ImageBackground>
      <DoubleModal
        isVisible={isLoginModalVisible}
        setIsVisible={setIsLoginModalVisible}
        image={traffic_cone_icon}
        mainText={"로그인이 필요한 서비스입니다."}
        subText={
          `로그인을 하면 리뷰, 자주 가는 수영장 고정 등\n더 많은 서비스를 이용할 수 있어요.`
        }
        leftButtonText={"아니요"}
        onPressLeftButton={() => {
          setIsLoginModalVisible(false)
        }}
        rightButtonText={"간편 로그인하기"}
        onPressRightButton={() => {
          setIsLoginModalVisible(false)
          navigation.navigate("LandingScreen")
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  view: {flex: 1},
  imageBackground: {flex: 1},
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  myPool: {
    backgroundColor: SyeongColors.gray_1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingTop: 26,
    marginTop: Dimensions.get("screen").height * 0.06,
  },
  myPoolTitle: {
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  myPoolText: {
    color: SyeongColors.gray_8,
    fontWeight: "600",
    fontSize: 17,
    lineHeight: 20.29,
    letterSpacing: -0.41,
  },
  myPoolSubText: {
    color: SyeongColors.gray_4,
    fontSize: 14,
    lineHeight: 16.71,
    letterSpacing: -0.41,
    fontWeight: "500",
  },
  poolListTitle: {
    backgroundColor: SyeongColors.gray_1,
    paddingTop: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 16,
  },
  poolListButton: {flexDirection: "row", alignItems: "center"},
  map_icon: {width: 20, height: 20, marginRight: 4, position: "absolute"},
  regionText: {
    color: SyeongColors.gray_6,
    fontWeight: "600",
    fontSize: 17,
    lineHeight: 20.29,
    letterSpacing: -0.41,
  },
  syeong_logo: {width: 113.23, height: 116},
  smallText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 22.4,
    letterSpacing: -0.41,
    fontWeight: "500",
    marginTop: 45,
    marginBottom: 15,
  },
  caret_up: {width: 32, height: 32},
  caret_down: {
    width: 18,
    height: 18,
    marginLeft: 2,
    marginRight: 4,
    position: "absolute",
    right: 0,
  },
  mediumText: {
    color: SyeongColors.gray_6,
    fontWeight: "600",
    fontSize: 17,
    lineHeight: 20.29,
    letterSpacing: -0.41,
  },
})

export default HomeMainScreen
