import {useFocusEffect} from "@react-navigation/native"
import React, {useCallback, useEffect, useRef, useState} from "react"
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  ListRenderItem,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import PagerView from "react-native-pager-view"
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context"
import SelectDropdown from "react-native-select-dropdown"
import {useRecoilValue} from "recoil"
import {
  caret_down_icon,
  gear_icon,
  pencil_icon,
  pencil_icon_gray2,
  pencil_icon_gray3,
  pencil_icon_line,
  pin_icon_gray5,
  pin_icon_sub4,
  push_pin_simple_icon,
  x_icon,
} from "../../../../assets/icons"
import {user} from "../../../atoms/auth"
import {pool, PoolType} from "../../../atoms/pool"
import {DELETE_Review, GET_ReviewByUser} from "../../../axios/review"
import BackButton from "../../../components/Button/BackButton"
import {SyeongColors} from "../../../components/Colors"
import Header from "../../../components/Header/Header"
import SyeongStatusBar from "../../../components/Header/SyeongStatusBar"
import {useDateFormat} from "../../../hooks/useDate"
import {useMyPoolAdd, useMyPoolDelete} from "../../../hooks/useMyPool"
import {useUserAtomUpdate} from "../../../hooks/useUserAtom"
import {ReviewType} from "../../search/SearchDetailScreen"

const MyMainScreen = ({navigation}) => {
  const pagerRef = useRef<PagerView>()
  const [pagerState, setPagerState] = useState<number>(0)
  const [orderByState, setOrderByState] = useState<string>("")
  const [myPoolData, setMyPoolData] = useState<PoolType[]>([])
  const [myReview, setMyReview] = useState<ReviewType[]>([])
  const userAtom = useRecoilValue(user)
  const poolAtom = useRecoilValue(pool)

  const insets = useSafeAreaInsets()

  useFocusEffect(
    useCallback(() => {
      useUserAtomUpdate()
      getMyReview()
    }, []),
  )

  useEffect(() => {
    const poolData = poolAtom.filter(el => {
      return userAtom.mypools?.includes(el._id)
    })
    setMyPoolData(poolData)
  }, [userAtom.mypools])

  useEffect(() => {
    if (orderByState === "최신순") {
      setMyReview(sortMyReview(myReview))
    } else {
      setMyReview(sortMyReview(myReview))
    }
  }, [orderByState])

  const onPressPin = async (poolid: string) => {
    if (userAtom.mypools?.includes(poolid)) {
      await useMyPoolDelete(poolid)
    } else {
      await useMyPoolAdd(poolid)
    }
  }

  const sortMyReview = (reviews: ReviewType[]) => {
    if (orderByState === "최신순") {
      return reviews.sort((a, b) => {
        const aDate = a.editdate ? new Date(a.editdate) : new Date(a.createdat)
        const bDate = b.editdate ? new Date(b.editdate) : new Date(b.createdat)
        if (aDate < bDate) return -1
        else return 1
      })
    } else {
      return reviews.sort((a, b) => {
        const aDate = a.editdate ? new Date(a.editdate) : new Date(a.createdat)
        const bDate = b.editdate ? new Date(b.editdate) : new Date(b.createdat)
        if (aDate < bDate) return 1
        else return -1
      })
    }
  }

  const getMyReview = async () => {
    try {
      const data = await GET_ReviewByUser()
      if (!data.reviews) {
        setMyReview([])
        return
      }
      setMyReview(data.reviews)
    } catch (err) {
      console.log(err)
    }
  }

  const renderReviewHeader = () => {
    return (
      <View style={{alignItems: "flex-end", marginTop: 16, marginBottom: 11}}>
        <SelectDropdown
          data={["최신순", "오래된순"]}
          onSelect={(selectedItem, index) => {
            setOrderByState(selectedItem)
          }}
          defaultButtonText="정렬"
          dropdownOverlayColor={"transparent"}
          buttonTextAfterSelection={selectedItem => {
            return selectedItem
          }}
          rowTextForSelection={selectedItem => {
            return selectedItem
          }}
          buttonStyle={{
            backgroundColor: "transparent",
            width: 88,
            height: 20,
          }}
          onChangeSearchInputText={() => null}
          buttonTextStyle={{
            color: SyeongColors.gray_4,
            fontSize: 15,
            fontWeight: "600",
            lineHeight: 17.9,
            letterSpacing: -0.41,
            marginRight: 4,
          }}
          dropdownStyle={{
            width: 90,
            height: 90,
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
                  width: 90,
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
          style={{width: 18, height: 18, position: "absolute", right: 0}}
        />
      </View>
    )
  }

  const renderReviewFooter = () => {
    if (myReview.length) return null
    return (
      <View
        style={{
          height: 280,
          justifyContent: "center",
          alignItems: "center",
          borderColor: SyeongColors.gray_2,
          borderWidth: 1.5,
          borderStyle: "dashed",
          borderRadius: 8,
        }}>
        <Image
          source={pencil_icon_gray2}
          style={{width: 80, height: 80, marginBottom: 36}}
        />
        <Text
          style={{
            color: SyeongColors.gray_8,
            fontSize: 18,
            fontWeight: "600",
            lineHeight: 21.48,
            letterSpacing: -0.41,
            marginBottom: 12,
          }}>
          아직 작성한 리뷰가 없어요!
        </Text>
        <Text
          style={{
            color: SyeongColors.gray_4,
            fontSize: 16,
            fontWeight: "500",
            lineHeight: 22.4,
            letterSpacing: -0.41,
            textAlign: "center",
          }}>
          방문해봤던 수영장 리뷰를 작성해보세요
        </Text>
      </View>
    )
  }

  const renderReviewItem: ListRenderItem<ReviewType> = ({
    item,
  }: {
    item: ReviewType
  }) => {
    return (
      <View
        style={{
          padding: 16,
          backgroundColor: "#FFFFFF",
          borderRadius: 10,
          marginVertical: 6,
        }}>
        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
          <Text
            style={{
              color: SyeongColors.gray_8,
              fontSize: 16,
              fontWeight: "600",
              lineHeight: 19.09,
              letterSpacing: -0.41,
              marginBottom: 8,
              flexShrink: 1,
            }}>
            {poolAtom.filter(el => el._id === item.poolid)[0].name}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("EditMyReviewScreen", {
                data: {
                  item,
                  name: poolAtom.filter(el => el._id === item.poolid)[0].name,
                },
              })
            }}>
            <Image source={pencil_icon_gray3} style={{width: 24, height: 24}} />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: SyeongColors.gray_4,
            fontSize: 15,
            fontWeight: "500",
            lineHeight: 22,
            letterSpacing: -0.41,
            marginBottom: 20,
          }}>
          {poolAtom.filter(el => el._id === item.poolid)[0].address}
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginBottom: 16,
          }}>
          {item.keywordreviews.map((keyword, index) => {
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
                    fontWeight: "500",
                    lineHeight: 16.71,
                    letterSpacing: -0.41,
                  }}>
                  {keyword}
                </Text>
              </View>
            )
          })}
        </View>
        <Text
          style={{
            color: SyeongColors.gray_6,
            fontSize: 14,
            fontWeight: "500",
            lineHeight: 22,
            letterSpacing: -0.41,
            marginBottom: 12,
          }}>
          {item.textreview}
        </Text>
        <Text
          style={{
            color: SyeongColors.gray_4,
            fontSize: 14,
            fontWeight: "500",
            lineHeight: 22,
            letterSpacing: -0.41,
          }}>
          {item.editdate
            ? useDateFormat(item.editdate)
            : useDateFormat(item.createdat)}
          {item.editdate && "(수정됨)"}
        </Text>
      </View>
    )
  }

  const renderMyPoolItem = (item: PoolType, index: number) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          navigation.navigate("SearchDetailScreen", {item: item})
        }}>
        <View
          style={{
            backgroundColor: "#FFFFFF",
            marginVertical: 6,
            height: 107,
            padding: 16,
            borderRadius: 10,
          }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 8
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
              <Image source={pin_icon_sub4} style={{width: 24, height: 24}} />
            </TouchableOpacity>
          </View>

          <Text
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
  }

  const renderMyPoolPager = () => {
    return (
      <ScrollView
        contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 30}}>
        <Text
          style={{
            textAlign: "right",
            marginTop: 16,
            marginBottom: 10,
            color: SyeongColors.gray_4,
            fontSize: 14,
            fontWeight: "500",
            lineHeight: 16.71,
            letterSpacing: -0.41,
          }}>
          {myPoolData.length}/5
        </Text>
        {!myPoolData.length ? (
          <View
            style={{
              height: 107,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              borderColor: SyeongColors.gray_2,
              borderWidth: 1.5,
              borderStyle: "dashed",
              borderRadius: 10,
            }}>
            <Image
              source={push_pin_simple_icon}
              style={{width: 24, height: 24, marginRight: 8}}
            />
            <Text
              style={{
                color: SyeongColors.gray_5,
                fontSize: 15,
                fontWeight: "600",
                lineHeight: 22,
                letterSpacing: -0.41,
              }}>
              고정 수영장을 설정할 수 있어요!
            </Text>
          </View>
        ) : (
          myPoolData.map((item, index) => {
            return renderMyPoolItem(item, index)
          })
        )}
      </ScrollView>
    )
  }

  const renderReviewPager = () => {
    return (
      <FlatList
        data={myReview}
        contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 30}}
        ListHeaderComponent={renderReviewHeader()}
        renderItem={renderReviewItem}
        ListFooterComponent={renderReviewFooter()}
      />
    )
  }

  return (
    <View style={styles.safeAreaView}>
      <SyeongStatusBar />
      <View style={{marginTop: insets.top}}>
        <Header backgroundColor="#FFFFFF">
          <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <BackButton />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("MySettingScreen")
              }}>
              <Image source={gear_icon} style={styles.gear_icon} />
            </TouchableOpacity>
          </View>
        </Header>
      </View>
      <View style={styles.profileView}>
        <Text style={styles.usernameText}>{userAtom.privateinfo.nickname}</Text>
        <View style={styles.profileRow}>
          {!userAtom.privateinfo.goal ? (
            <Text style={[styles.subText, {color: SyeongColors.gray_3}]}>
              나만의 수영 목표를 정해보세요!
            </Text>
          ) : (
            <Text style={styles.subText}>{userAtom.privateinfo.goal}</Text>
          )}

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("EditProfileScreen")
            }}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
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
        {renderMyPoolPager()}
        {renderReviewPager()}
      </PagerView>
    </View>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  profileView: {
    paddingTop: 48,
    paddingHorizontal: 20,
    paddingBottom: 37,
  },
  usernameText: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 23.87,
    letterSpacing: -0.41,
    color: SyeongColors.gray_8,
    marginBottom: 8,
  },
  profileRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  subText: {
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 17.9,
    letterSpacing: -0.41,
    color: SyeongColors.gray_4,
    marginRight: 10,
    maxWidth: Dimensions.get("screen").width * 0.5,
  },
  gear_icon: {
    width: 24,
    height: 24,
  },
  smallText: {
    fontSize: 15,
    lineHeight: 17.9,
    letterSpacing: -0.41,
    fontWeight: "500",
    color: SyeongColors.gray_6,
  },
  pagerView: {
    flex: 1,
    backgroundColor: SyeongColors.gray_1,
  },
  pencil_icon_line: {width: 20, height: 20, marginRight: 4},
  buttonRow: {
    flexDirection: "row",
    marginHorizontal: 20,
    justifyContent: "space-around",
    borderTopColor: SyeongColors.gray_2,
    borderTopWidth: 0.7,
  },
  pagerButton: {
    width: 100,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  pagerBar: {
    width: 100,
    height: 4,
    borderRadius: 8,
    backgroundColor: SyeongColors.sub_3,
  },
  pagerButtonText: {
    fontSize: 17,
    lineHeight: 20.29,
    letterSpacing: -0.41,
    fontWeight: "600",
    color: SyeongColors.gray_8,
    height: 50,
    paddingTop: 18,
  },
  subPagerButtonText: {
    color: SyeongColors.gray_4,
  },
})

export default MyMainScreen
