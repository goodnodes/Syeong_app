import Clipboard from "@react-native-clipboard/clipboard"
import {useFocusEffect} from "@react-navigation/native"
import React, {useCallback, useRef, useState} from "react"
import {
  Alert,
  Dimensions,
  Linking,
  Platform,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import NaverMapView, {Marker} from "react-native-nmap"
import PagerView from "react-native-pager-view"
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated"
import {useSafeAreaInsets} from "react-native-safe-area-context"
import {useRecoilValue} from "recoil"
import {
  clipboard_icon,
  map_icon_main3,
  pencil_icon,
  pencil_icon_gray3,
  pencil_icon_sub3,
  phone_icon,
  pin_icon_gray3,
  pin_icon_gray3_shadow,
  pin_icon_sub4,
  pin_icon_sub4_shadow,
  push_pin_simple_icon_sub3,
  share_icon,
  share_icon_gray8,
  traffic_cone_icon,
} from "../../../../assets/icons"
import {blank_image} from "../../../../assets/images"
import {KeywordType} from "../../../../assets/static/keyword"
import {authAtom, user} from "../../../atoms/auth"
import {PoolType} from "../../../atoms/pool"
import {GET_ReviewByPool} from "../../../axios/review"
import BackButton from "../../../components/Button/BackButton"
import BasicButton from "../../../components/Button/BasicButton"
import {SyeongColors} from "../../../components/Colors"
import Image from "../../../components/Image/Image"
import DoubleModal from "../../../components/Modal/DoubleModal"
import SingleModal from "../../../components/Modal/SingleModal"
import {useMyPoolAdd, useMyPoolDelete} from "../../../hooks/useMyPool"
import ReviewBadgeComponent from "./ReviewBadgeComponent"
import ReviewItem from "./ReviewItem"

export interface ReviewType {
  _id: string
  poolid: string
  userid: string
  nickname: string
  textreview: string
  keywordreviews: KeywordType[]
  editdate: string
  createdat: string
}

export interface TopTagsType {
  Key: KeywordType
  Value: 2
}

const SearchDetailScreen = ({navigation, route}) => {
  const item: PoolType = route.params.item

  const offset = useSharedValue(0)
  const insets = useSafeAreaInsets()

  const [iconState, setIconState] = useState<boolean>()
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [isMyPoolModalVisible, setIsMyPoolModalVisible] =
    useState<boolean>(false)
  const [isWarningModalVisible, setIsWarningModalVisible] =
    useState<boolean>(false)
  const [isLoginModalVisible, setIsLoginModalVisible] = useState<boolean>(false)
  const [reviews, setReviews] = useState<ReviewType[]>([])
  const [topTags, setTopTags] = useState<TopTagsType[]>([])
  const userAtom = useRecoilValue(user)
  const isLoggedIn = useRecoilValue(authAtom)

  const [pagerState, setPagerState] = useState<number>(0)
  const pagerRef = useRef<PagerView>()

  useFocusEffect(
    useCallback(() => {
      getReviews()
    }, []),
  )

  const getReviews = async () => {
    try {
      const data = await GET_ReviewByPool(item._id)
      if (!data.reviews) return
      setReviews(data.reviews)
      setTopTags(data.topTags)
    } catch (err) {
      console.log(err)
    }
  }

  const animatedOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(offset.value, [100, 250], [0, 1], {
      extrapolateLeft: Extrapolation.CLAMP,
      extrapolateRight: Extrapolation.CLAMP,
    })
    return {opacity}
  })

  const scrollHandler = useAnimatedScrollHandler(event => {
    offset.value = event.contentOffset.y
    if (event.contentOffset.y > 150) runOnJS(setIconState)(true)
    else runOnJS(setIconState)(false)
  })

  const copyLocationToClipboard = (location: string) => {
    Clipboard.setString(location)
  }

  const copyCallToClipboard = (call: string) => {
    Clipboard.setString(call)
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `${item.name}\n주소: ${item.address}\n전화: ${item.pnum}\n[셩 - 수영인을 위한 위한 수영앱]`,
      })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message)
    }
  }

  const onPressPin = async () => {
    if (!isLoggedIn) {
      setIsLoginModalVisible(true)
      return
    }
    try {
      if (userAtom.mypools?.includes(item._id)) {
        await useMyPoolDelete(item._id)
      } else {
        await useMyPoolAdd(item._id)
        setIsMyPoolModalVisible(true)
      }
    } catch (err) {
      if (err === "myPool limit") {
        setIsWarningModalVisible(true)
      } else {
        console.log(err)
      }
    }
  }

  const position = {
    latitude: Number(item.geo.latitude),
    longitude: Number(item.geo.longitude),
  }

  const renderMap = () => {
    return (
      <View style={styles.locationView}>
        <Text style={styles.reviewTitle}>수영장 지도</Text>
        <NaverMapView
          style={{
            width: "100%",
            height: 180,
            marginBottom: 14,
            marginTop: 20,
          }}
          // showsMyLocationButton={true}
          center={{...position, zoom: 13}}
          // onTouch={e =>
          //   console.warn("onTouch", JSON.stringify(e.nativeEvent))
          // }
          // onCameraChange={e =>
          //   console.warn("onCameraChange", JSON.stringify(e))
          // }
          // onMapClick={e => console.warn("onMapClick", JSON.stringify(e))}
        >
          <Marker
            coordinate={position}
            // onClick={() => console.warn("onClick! p0")}
          />
        </NaverMapView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 36,
          }}>
          <Image
            source={map_icon_main3}
            style={[styles.map_icon_main3, {marginTop: 1}]}
          />

          <Text
            style={{
              color: SyeongColors.gray_7,
              fontSize: 15,
              fontWeight: "500",
              lineHeight: 22,
              letterSpacing: -0.41,
              marginRight: 4,
              flexShrink: 1,
            }}>
            {item.address}
          </Text>
          <TouchableOpacity
            onPress={() => {
              copyLocationToClipboard(item.address)
            }}>
            <Image
              source={clipboard_icon}
              style={[styles.clipboard_icon, {marginTop: 2}]}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.freeInfo}>
          <Text
            style={{
              color: SyeongColors.gray_7,
              fontWeight: "600",
              fontSize: 15,
              lineHeight: 17.9,
              letterSpacing: -0.41,
            }}>
            바로 길을 찾고 싶을 때
          </Text>

          <BasicButton
            text="네이버 지도로 길찾기"
            backgroundColor={SyeongColors.main_3}
            textColor={SyeongColors.gray_1}
            onPress={() => {
              Linking.openURL(
                `nmap://search?query=${encodeURI(
                  item.name,
                )}&appname=org.reactjs.native.syeong-app`,
              ).catch(err => {
                if (Platform.OS === "ios") {
                  Linking.openURL(
                    "http://itunes.apple.com/app/id311867728?mt=8",
                  )
                } else {
                  Linking.openURL("market://details?id=com.nhn.android.nmap")
                }
              })
            }}
            flexShrink
            padding={[0, 8, 0, 8]}
            height={36}
            borderRadius={8}
            borderColor={SyeongColors.sub_3}
            textSize={15}
            borderWidth={1}
          />
        </View>
      </View>
    )
  }

  const renderReview = () => {
    return (
      <View style={styles.reviewContainer}>
        <View style={styles.reviewTitleRow}>
          <View style={styles.rowAlignCenter}>
            <Text style={styles.reviewTitle}>수영장 리뷰 </Text>
            <Text style={styles.reviewNum}>{reviews.length}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              if (!isLoggedIn) {
                setIsLoginModalVisible(true)
                return
              }
              if (reviews.filter(el => el.userid === userAtom._id).length) {
                setIsModalVisible(true)
              } else {
                navigation.navigate("WriteReviewScreen", {
                  data: {name: item.name, _id: item._id},
                })
              }
            }}>
            <View style={styles.rowAlignCenter}>
              <Image source={pencil_icon} style={styles.pencil_icon} />
              <Text style={styles.plainText}>리뷰 작성하기</Text>
            </View>
          </TouchableOpacity>
        </View>
        {!reviews.length ? (
          <View
            style={{
              height: 105,
              backgroundColor: SyeongColors.gray_1,
              borderWidth: 1.5,
              borderColor: SyeongColors.gray_2,
              borderStyle: "dashed",
              borderRadius: 8,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Image
              source={pencil_icon_gray3}
              style={{width: 24, height: 24, marginRight: 8}}
            />
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                lineHeight: 22,
                letterSpacing: -0.41,
                color: SyeongColors.gray_4,
              }}>
              {`가장 처음으로 리뷰를 작성해주세요!`}
            </Text>
          </View>
        ) : (
          <View style={styles.reviewContainer}>
            {topTags.map((el, index, array) => (
              <ReviewBadgeComponent
                key={index}
                prize={
                  index === 1 && array[0].Value === el.Value ? 1 : index + 1
                }
                reviewNum={el.Value}
                content={el.Key}
              />
            ))}
            <View style={styles.reviewList}>
              {reviews.slice(0, 2).map((item, index) => {
                return <ReviewItem key={index} review={item} />
              })}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ReviewDetailScreen", {
                    reviews,
                    topTags,
                    name: item.name,
                    _id: item._id,
                  })
                }}>
                <Text
                  style={{
                    marginTop: 16,
                    marginBottom: 24,
                    textAlign: "center",
                    color: SyeongColors.gray_5,
                    fontSize: 15,
                    fontWeight: "600",
                    lineHeight: 32,
                  }}>
                  리뷰 더보기
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <DoubleModal
          isVisible={isModalVisible}
          setIsVisible={setIsModalVisible}
          image={pencil_icon_sub3}
          mainText={"작성한 리뷰를 수정할까요?"}
          subText={"이미 작성한 리뷰가 있어요\n리뷰를 수정할까요?"}
          leftButtonText="아니요"
          onPressLeftButton={() => {
            setIsModalVisible(false)
          }}
          rightButtonText="수정하기"
          onPressRightButton={() => {
            navigation.navigate("EditMyReviewScreen", {
              data: {
                item: reviews.filter(el => el.userid === userAtom._id)[0],
                name: item.name,
              },
            })
            setIsModalVisible(false)
          }}
        />
      </View>
    )
  }

  const renderCostInfo = () => {
    return (
      <View style={styles.freeInfo}>
        <Text
          style={{
            color: SyeongColors.gray_7,
            fontWeight: "600",
            fontSize: 15,
            lineHeight: 17.9,
            letterSpacing: -0.41,
          }}>
          수영 강습에 관심이 있다면
        </Text>
        {!item.costinfourl.length ? (
          <BasicButton
            disabled
            disableTextColor={SyeongColors.gray_1}
            text="강습 정보 보러가기"
            backgroundColor={"#CBDEF8"}
            textColor={SyeongColors.gray_1}
            onPress={() => {
              console.log(item.costinfourl)
              Linking.openURL(item.costinfourl)
            }}
            flexShrink
            padding={[0, 10, 0, 10]}
            height={36}
            borderRadius={8}
            borderColor={"#CAEEDF"}
            textSize={15}
            borderWidth={1}
          />
        ) : (
          <BasicButton
            text="강습 정보 보러가기"
            backgroundColor={SyeongColors.main_3}
            textColor={SyeongColors.gray_1}
            onPress={() => {
              console.log(item.costinfourl)
              Linking.openURL(item.costinfourl)
            }}
            flexShrink
            padding={[0, 10, 0, 10]}
            height={36}
            borderRadius={8}
            borderColor={SyeongColors.sub_3}
            textSize={15}
            borderWidth={1}
          />
        )}
      </View>
    )
  }

  const renderFreeSwimInfo = () => {
    return (
      <View style={styles.freeInfo}>
        <Text
          style={{
            color: SyeongColors.gray_7,
            fontWeight: "600",
            fontSize: 15,
            lineHeight: 17.9,
            letterSpacing: -0.41,
          }}>
          🏊‍♀️ 자유 수영이 하고 싶을 땐
        </Text>
        {!item.freeswiminfourl.length ? (
          <BasicButton
            disabled
            disableTextColor={SyeongColors.gray_1}
            text="자유 수영 보러가기"
            backgroundColor={"#CBDEF8"}
            textColor={SyeongColors.gray_1}
            onPress={() => {
              console.log(item.freeswiminfourl)
              Linking.openURL(item.freeswiminfourl)
            }}
            flexShrink
            padding={[0, 10, 0, 10]}
            height={36}
            borderRadius={8}
            borderColor={"#CAEEDF"}
            textSize={15}
            borderWidth={1}
          />
        ) : (
          <BasicButton
            text="자유 수영 보러가기"
            backgroundColor={SyeongColors.main_3}
            textColor={SyeongColors.gray_1}
            onPress={() => {
              console.log(item.freeswiminfourl)
              Linking.openURL(item.freeswiminfourl)
            }}
            flexShrink
            padding={[0, 10, 0, 10]}
            height={36}
            borderRadius={8}
            borderColor={SyeongColors.sub_3}
            textSize={15}
            borderWidth={1}
          />
        )}
      </View>
    )
  }

  const renderBasicInfo = () => {
    return (
      <View style={styles.infoRow}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 6,
          }}>
          <Image
            source={map_icon_main3}
            style={[styles.map_icon_main3, {marginTop: 0}]}
          />

          <Text
            style={{
              color: SyeongColors.gray_5,
              fontSize: 15,
              fontWeight: "500",
              lineHeight: 22,
              letterSpacing: -0.41,
              marginRight: 4,
              flexShrink: 1,
            }}>
            {item.address}
          </Text>
          <TouchableOpacity
            onPress={() => {
              copyLocationToClipboard(item.address)
            }}>
            <Image
              source={clipboard_icon}
              style={[styles.clipboard_icon, {marginTop: 2}]}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 6,
            }}>
            <Image source={phone_icon} style={styles.map_icon_main3} />
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:${item.pnum}`)
              }}>
              <Text
                style={{
                  color: SyeongColors.main_4,
                  fontSize: 15,
                  fontWeight: "500",
                  lineHeight: 22,
                  letterSpacing: -0.41,
                  marginRight: 4,
                }}>
                {item.pnum}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                copyCallToClipboard(item.pnum)
              }}>
              <Image source={clipboard_icon} style={styles.clipboard_icon} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("MySettingProposalScreen")
            }}>
            <Text
              style={{
                color: SyeongColors.gray_4,
                fontSize: 14,
                fontWeight: "500",
                lineHeight: 16.71,
                letterSpacing: -0.41,
              }}>
              정보 수정 제안하기
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View style={{flex: 1, backgroundColor: "#FFFFFF"}}>
      <StatusBar
        barStyle={
          Platform.OS === "android"
            ? "light-content"
            : iconState
            ? "dark-content"
            : "light-content"
        }
      />
      <Animated.View
        style={[
          {
            width: "100%",
            alignItems: "center",
            zIndex: 20,
            position: "absolute",
            paddingHorizontal: 20,
            top: 0,
            height: insets.top + 44,
            paddingTop: insets.top + 7,
            backgroundColor: "#FFFFFF",
            flexDirection: "row",
            justifyContent: "space-between",
            shadowColor: "#C5CCD366",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.57,
            shadowRadius: 5,

            elevation: 10,
          },
          animatedOpacity,
        ]}>
        <BackButton />
        <View
          style={{
            left: 20,
            position: "absolute",
            top: insets.top + 14,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            zIndex: -10,
          }}>
          <Text
            numberOfLines={1}
            style={{
              color: SyeongColors.gray_8,
              fontSize: 17,
              fontWeight: "600",
              lineHeight: 20.29,
              letterSpacing: -0.41,
            }}>
            {item.name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
          }}>
          <TouchableOpacity onPress={onShare}>
            <Image
              source={share_icon_gray8}
              style={{width: 24, height: 24, marginRight: 16}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressPin}>
            <Image
              source={
                userAtom.mypools?.includes(item._id)
                  ? pin_icon_sub4
                  : pin_icon_gray3
              }
              style={{width: 24, height: 24}}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
      <View
        style={[
          {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 10,
            position: "absolute",
            paddingHorizontal: 20,
            width: "100%",
            top: 0,
            height: insets.top + 44,
            paddingTop: insets.top + 7,
          },
        ]}>
        <BackButton isLight />
        <View style={{flexDirection: "row", alignContent: "center"}}>
          <TouchableOpacity>
            <Image
              source={share_icon}
              style={{width: 24, height: 24, marginRight: 16}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressPin}>
            <Image
              source={
                userAtom.mypools?.includes(item._id)
                  ? pin_icon_sub4_shadow
                  : pin_icon_gray3_shadow
              }
              style={{width: 24, height: 24}}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Animated.ScrollView
        style={{
          flex: 1,
        }}
        onScroll={scrollHandler}
        scrollEventThrottle={16}>
        <PagerView
          ref={pagerRef}
          initialPage={0}
          style={{
            position: "absolute",
            zIndex: -10,
            width: "100%",
            height: Dimensions.get("screen").height / 2.4,
          }}
          onPageSelected={e => {
            setPagerState(e.nativeEvent.position)
          }}>
          <Image
            source={item.imgurl ? {uri: item.imgurl} : blank_image}
            key={1}
            style={{
              width: "100%",
              height: Dimensions.get("screen").height / 2.4,
            }}
          />
          <Image
            source={
              item.outsideimgurl ? {uri: item.outsideimgurl} : blank_image
            }
            key={2}
            style={{
              width: "100%",
              height: Dimensions.get("screen").height / 2.4,
            }}
          />
        </PagerView>

        <View
          style={{
            backgroundColor: "white",
            marginTop: Dimensions.get("screen").height / 2.7,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            flex: 1,
            paddingHorizontal: 20,
          }}>
          <View
            style={{
              position: "absolute",
              top: -20,
              left: 20,
              height: 8,
              width: "100%",
              alignItems: "center",
            }}>
            <View style={{flexDirection: "row"}}>
              <View
                style={[
                  {
                    width: 8,
                    height: 8,
                    backgroundColor: SyeongColors.gray_1,
                    borderRadius: 999,
                    marginRight: 4,
                  },
                  pagerState === 0 && {width: 24},
                ]}
              />
              <View
                style={[
                  {
                    width: 8,
                    height: 8,
                    backgroundColor: SyeongColors.gray_1,
                    borderRadius: 999,
                  },
                  pagerState === 1 && {width: 24},
                ]}
              />
            </View>
          </View>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{item.name}</Text>
            {item.lanelength !== 0 && item.lanenum !== 0 ? (
              <>
                <View style={styles.laneBadge}>
                  <Text style={styles.laneBadgeText}>{item.lanelength}m</Text>
                </View>
                <View style={styles.numberBadge}>
                  <Text style={styles.numberBadgeText}>{item.lanenum}</Text>
                </View>
              </>
            ) : null}
          </View>
          {renderBasicInfo()}
          {renderFreeSwimInfo()}
          {renderReview()}
          {renderCostInfo()}
          {renderMap()}
          <View
            style={{
              marginBottom: 20,
            }}>
            <Text
              style={{
                color: SyeongColors.gray_4,
                fontSize: 14,
                fontWeight: "500",
                lineHeight: 22,
                letterSpacing: -0.41,
              }}>
              위 정보의 출처는{" "}
              <Text
                style={{
                  color: SyeongColors.main_3,
                  fontSize: 14,
                  fontWeight: "500",
                  lineHeight: 22,
                  letterSpacing: -0.41,
                }}>
                {item.name} 홈페이지
              </Text>{" "}
              입니다
            </Text>
          </View>
          <View
            style={{
              marginBottom: 50,
            }}>
            <Text
              style={{
                color: SyeongColors.gray_3,
                fontSize: 14,
                fontWeight: "500",
                lineHeight: 22,
                letterSpacing: -0.41,
              }}>
              현재 시점과 다른 정보가 있을 수 있으니, 자세한 정보는 수영장 전화
              문의를 통해 확인하세요. 업데이트가 필요한 정보는{" "}
              <Text
                style={{
                  color: SyeongColors.main_3,
                  fontSize: 14,
                  fontWeight: "500",
                  lineHeight: 22,
                  letterSpacing: -0.41,
                }}
                onPress={() => {
                  navigation.navigate("MySettingProposalScreen")
                }}>
                수정 제안
              </Text>{" "}
              부탁드려요.
            </Text>
          </View>
        </View>
      </Animated.ScrollView>

      <SingleModal
        isVisible={isMyPoolModalVisible}
        setIsVisible={setIsMyPoolModalVisible}
        onPressButton={() => {
          setIsMyPoolModalVisible(false)
        }}
        image={push_pin_simple_icon_sub3}
        mainText="나의 고정 수영장에 저장했어요!"
        subText={`고정 수영장은 최대 5개까지 설정할 수 있고 홈 화면,\n내 정보에서 확인할 수 있어요`}
        buttonText="확인"
      />
      <SingleModal
        isVisible={isWarningModalVisible}
        setIsVisible={setIsWarningModalVisible}
        onPressButton={() => {
          setIsWarningModalVisible(false)
        }}
        image={traffic_cone_icon}
        mainText="이미 고정 수영장 5개를 설정했어요!"
        subText={`고정 수영장은 최대 5개까지 설정할 수 있고 홈 화면,\n내 정보에서 확인할 수 있어요`}
        buttonText="확인"
      />
      <DoubleModal
        isVisible={isLoginModalVisible}
        setIsVisible={setIsLoginModalVisible}
        image={traffic_cone_icon}
        mainText={"로그인이 필요한 서비스입니다."}
        subText={`로그인을 하면 리뷰, 자주 가는 수영장 고정 등\n더 많은 서비스를 이용할 수 있어요.`}
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
  titleRow: {
    flexDirection: "row",
    marginTop: 36,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 21.48,
    letterSpacing: -0.41,
    color: SyeongColors.gray_8,
  },
  laneBadge: {
    backgroundColor: SyeongColors.sub_4,
    paddingVertical: 1,
    paddingHorizontal: 7,
    borderRadius: 999,
    position: "absolute",
    right: 20,
    zIndex: 10,
  },
  laneBadgeText: {
    color: SyeongColors.gray_1,
    fontSize: 16,
    fontWeight: "500",
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
    justifyContent: "center",
    alignItems: "center",
  },
  numberBadgeText: {
    color: SyeongColors.sub_4,
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 16.71,
    letterSpacing: -0.35,
  },
  infoRow: {marginBottom: 42, width: " 100%"},
  map_icon_main3: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  clipboard_icon: {
    width: 18,
    height: 18,
  },
  rowAlignCenter: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  freeInfo: {
    backgroundColor: SyeongColors.gray_1,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 22,
    marginBottom: 37,
  },
  reviewContainer: {marginBottom: 24},
  reviewTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  reviewTitle: {
    color: SyeongColors.gray_8,
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 19.09,
    letterSpacing: -0.41,
  },
  reviewNum: {
    color: SyeongColors.gray_6,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 19.09,
    letterSpacing: -0.41,
  },
  pencil_icon: {width: 20, height: 20, marginRight: 4},
  plainText: {
    color: SyeongColors.gray_6,
    fontWeight: "500",
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
  locationView: {},
})

export default SearchDetailScreen
