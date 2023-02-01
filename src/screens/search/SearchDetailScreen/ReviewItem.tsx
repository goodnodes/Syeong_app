import {View, Text} from "react-native"
import React from "react"
import {SyeongColors} from "../../../components/Colors"
import {ReviewType} from "."
import {useDateFormat} from "../../../hooks/useDate"
import {useRoute} from "@react-navigation/native"

type Props = {
  review: ReviewType
}
const ReviewItem = (props: Props) => {
  const route = useRoute()
  const {nickname, createdat, textreview, keywordreviews, editdate} =
    props.review
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginBottom: 16,
          marginTop: 12,
        }}>
        {keywordreviews.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                backgroundColor: SyeongColors.gray_2,
                borderWidth: 1,
                borderColor: SyeongColors.gray_1,
                borderRadius: 8,
                paddingVertical: 9.5,
                paddingHorizontal: 13,
                justifyContent: "center",
                alignItems: "center",
                marginRight: 4,
                marginVertical: 4,
              }}>
              <Text
                style={{
                  color: SyeongColors.gray_6,
                  fontSize: 14,
                  fontWeight: "500",
                  lineHeight: 16.71,
                  letterSpacing: -0.41,
                }}>
                {item}
              </Text>
            </View>
          )
        })}
      </View>
      <View style={{marginBottom: 12}}>
        <Text
          numberOfLines={route.name === "SearchDetailScreen" ? 2 : undefined}
          style={{
            color: SyeongColors.gray_6,
            fontSize: 14,
            fontWeight: "500",
            lineHeight: 22,
            letterSpacing: -0.41,
          }}>
          {textreview}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 12,
        }}>
        <Text
          style={{
            color: SyeongColors.gray_8,
            fontSize: 14,
            fontWeight: "600",
            lineHeight: 22,
            letterSpacing: -0.41,
            marginRight: 8,
          }}>
          {nickname}
        </Text>
        <Text
          style={{
            color: SyeongColors.gray_4,
            fontSize: 14,
            fontWeight: "500",
            lineHeight: 22,
            letterSpacing: -0.41,
          }}>
          {editdate ? useDateFormat(editdate) : useDateFormat(createdat)}
          {editdate && "(수정됨)"}
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          height: 1,
          backgroundColor: SyeongColors.gray_2,
          marginBottom: 8,
        }}
      />
    </View>
  )
}

export default ReviewItem
