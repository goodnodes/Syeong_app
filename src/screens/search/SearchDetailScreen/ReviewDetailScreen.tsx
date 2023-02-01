import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from "react-native"
import React from "react"
import ReviewBadgeComponent from "./ReviewBadgeComponent"
import Image from "../../../components/Image/Image"
import ReviewItem from "./ReviewItem"
import {pencil_icon} from "../../../../assets/icons"
import BackButton from "../../../components/Button/BackButton"
import {SyeongColors} from "../../../components/Colors"
import Header from "../../../components/Header/Header"
import HaederWithTitle from "../../../components/Header/HeaderWithTitle"

const ReviewDetailScreen = ({navigation, route}) => {
  const {reviews,topTags, name} = route.params
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar barStyle={"dark-content"} />
      <HaederWithTitle backgroundColor="#FFFFFF" title={name} />
      <View style={styles.reviewContainer}>
        <View style={styles.reviewTitleRow}>
          <View style={styles.rowAlignCenter}>
            <Text style={styles.reviewTitle}>수영장 리뷰 </Text>
            <Text style={styles.reviewNum}>{reviews.length}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("WriteReviewScreen", {
                data: {title: name},
              })
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
