import React, {useState} from "react"
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import {useRecoilValue} from "recoil"
import {pencil_icon, pencil_icon_sub3} from "../../../../assets/icons"
import {user} from "../../../atoms/auth"
import {SyeongColors} from "../../../components/Colors"
import HaederWithTitle from "../../../components/Header/HeaderWithTitle"
import SyeongStatusBar from "../../../components/Header/SyeongStatusBar"
import Image from "../../../components/Image/Image"
import DoubleModal from "../../../components/Modal/DoubleModal"
import ReviewBadgeComponent from "./ReviewBadgeComponent"
import ReviewItem from "./ReviewItem"

const ReviewDetailScreen = ({navigation, route}) => {
  const {reviews, topTags, name, _id} = route.params

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const userAtom = useRecoilValue(user)

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <SyeongStatusBar />
      <HaederWithTitle backgroundColor="#FFFFFF" title={name} />
      <View style={styles.reviewContainer}>
        <View style={styles.reviewTitleRow}>
          <View style={styles.rowAlignCenter}>
            <Text style={styles.reviewTitle}>수영장 리뷰 </Text>
            <Text style={styles.reviewNum}>{reviews.length}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              if (reviews.filter(el => el.userid === userAtom._id).length) {
                setIsModalVisible(true)
              } else {
                navigation.navigate("WriteReviewScreen", {
                  data: {name: name, _id: _id},
                })
              }
            }}>
            <View style={styles.rowAlignCenter}>
              <Image source={pencil_icon} style={styles.pencil_icon} />
              <Text style={styles.plainText}>리뷰 작성하기</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={reviews}
        renderItem={({item, index}) => {
          return (
            <View
              style={[
                {
                  backgroundColor: SyeongColors.gray_1,
                  paddingHorizontal: 16,
                },
                index === 0 && {
                  borderTopRightRadius: 8,
                  borderTopLeftRadius: 8,
                },
                index === reviews.length - 1 && {
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                },
              ]}>
              <ReviewItem review={item} />
            </View>
          )
        }}
        contentContainerStyle={{paddingBottom: 20, paddingHorizontal: 20}}
        ListHeaderComponent={
          <View style={{marginBottom: 4}}>
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
          </View>
        }
      />
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
              name: name,
            },
          })
          setIsModalVisible(false)
        }}
      />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  reviewContainer: {marginBottom: 24, paddingHorizontal: 20, marginTop: 48},
  reviewTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    // paddingHorizontal: 16,
    marginTop: 4,
  },
  rowAlignCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
})

export default ReviewDetailScreen
