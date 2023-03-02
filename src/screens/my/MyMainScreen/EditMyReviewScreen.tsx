import React, {useState} from "react"
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import {
  pencil_icon_sub3,
  traffic_cone_icon,
  trash_icon,
  x_icon,
} from "../../../../assets/icons"
import {KeywordType, reviewTagsData} from "../../../../assets/static/keyword"
import {DELETE_Review, PATCH_EditReview} from "../../../axios/review"
import BasicButton from "../../../components/Button/BasicButton"
import {SyeongColors} from "../../../components/Colors"
import Header from "../../../components/Header/Header"
import HaederWithTitle from "../../../components/Header/HeaderWithTitle"
import SyeongStatusBar from "../../../components/Header/SyeongStatusBar"
import Image from "../../../components/Image/Image"
import DoubleModal from "../../../components/Modal/DoubleModal"

const EditMyReviewScreen = ({navigation, route}) => {
  const {item, name} = route.params.data

  const [reviewText, setReviewText] = useState<string>(item.textreview)
  const [reviewTags, setReviewTags] = useState<KeywordType[]>(
    item.keywordreviews,
  )
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false)

  const renderCategoryTitle = (category: string) => {
    switch (category) {
      case "clean":
        return "청결"
      case "service":
        return "서비스"
      case "price":
        return "가격"
      case "access":
        return "접근성"
      case "etc":
        return "기타"
    }
  }

  const onPressButton = () => {
    requestEditReview()
  }

  const requestEditReview = async () => {
    try {
      const result = await PATCH_EditReview(item._id, item, {
        textreview: reviewText,
        keywordreviews: reviewTags,
        poolid: item.poolid,
        userid: item.userid,
      })
      setTimeout(() => {
        setIsModalVisible(false)

        navigation.replace("CompleteScreen")
      }, 300)
    } catch (err) {
      console.log(err)
      Alert.alert("리뷰 수정에 실패했습니다. 다시 시도해주세요!")
    }
  }

  const deleteReview = async () => {
    try {
      const result = await DELETE_Review(item._id, item.userid)
      console.log(result)
      setIsDeleteModalVisible(false)
      navigation.goBack()
    } catch (err) {
      console.log(err)
      Alert.alert("리뷰 삭제에 실패했습니다. 다시 시도해주세요!")
    }
  }

  const renderKeywordReview = () => {
    return (
      <>
        <View style={styles.titleRow}>
          <Text
            style={{
              color: SyeongColors.gray_8,
              fontSize: 17,
              fontWeight: "600",
              lineHeight: 20.29,
              letterSpacing: -0.41,
              marginBottom: 4,
            }}>
            키워드 리뷰
          </Text>
          <Text
            style={{
              color: SyeongColors.gray_4,
              fontSize: 16,
              fontWeight: "500",
              lineHeight: 19.09,
              letterSpacing: -0.41,
            }}>
            수영장 키워드 최대 5개 선택 가능해요
          </Text>
        </View>
        <View>
          <ScrollView
            horizontal
            contentContainerStyle={{paddingLeft: 20, paddingBottom: 10}}
            indicatorStyle={"white"}>
            {Object.keys(reviewTagsData).map(category => {
              return (
                <View key={category}>
                  <Text style={styles.categoryTitle}>
                    {renderCategoryTitle(category)}
                  </Text>
                  {reviewTagsData[category].map(
                    (tag: KeywordType, tagIndex: number) => {
                      return (
                        <TouchableOpacity
                          key={tagIndex}
                          onPress={() => {
                            if (reviewTags.includes(tag)) {
                              setReviewTags(
                                reviewTags.filter(item => item !== tag),
                              )
                            } else {
                              setReviewTags([...reviewTags, tag])
                            }
                          }}>
                          <View
                            style={[
                              styles.tagButton,
                              reviewTags.includes(tag) && {
                                backgroundColor: SyeongColors.main_4,
                              },
                            ]}>
                            <Text
                              style={[
                                styles.tagButtonText,
                                reviewTags.includes(tag) && {
                                  color: SyeongColors.gray_1,
                                },
                              ]}>
                              {tag}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      )
                    },
                  )}
                </View>
              )
            })}
          </ScrollView>
        </View>
      </>
    )
  }

  const renderTextReview = () => {
    return (
      <View style={{marginTop: 50, paddingHorizontal: 20}}>
        <Text
          style={{
            color: SyeongColors.gray_8,
            fontSize: 17,
            fontWeight: "600",
            lineHeight: 20.29,
            letterSpacing: -0.41,
            marginBottom: 16,
          }}>
          리뷰 작성하기
        </Text>
        <View
          style={{
            backgroundColor: SyeongColors.gray_1,
            width: "100%",
            borderRadius: 8,
            padding: 16,
            minHeight: 172,
          }}>
          <TextInput
            value={reviewText}
            onChangeText={text => {
              setReviewText(text)
            }}
            multiline
            maxLength={350}
            placeholder="자유롭게 리뷰를 작성할 수 있어요"
            placeholderTextColor={SyeongColors.gray_4}
            style={{
              fontSize: 16,
              color: SyeongColors.gray_8,
              fontWeight: "500",
              lineHeight: 19.09,
              letterSpacing: -0.41,
              marginBottom: 30,
            }}
            autoComplete="off"
            autoCorrect={false}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              lineHeight: 19.09,
              letterSpacing: -0.41,
              color: SyeongColors.gray_4,
              position: "absolute",
              bottom: 16,
              right: 16,
            }}>
            {reviewText.length} / 350
          </Text>
        </View>
      </View>
    )
  }

  const renderEditModal = () => {
    return (
      <DoubleModal
        image={pencil_icon_sub3}
        mainText="작성한 리뷰를 수정할까요?"
        subText={`수영장 리뷰를 등록합니다.`}
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        leftButtonText={"아니요"}
        onPressLeftButton={() => {
          setIsModalVisible(false)
        }}
        rightButtonText={"수정하기"}
        onPressRightButton={onPressButton}
      />
    )
  }

  const renderDeleteModal = () => {
    return (
      <DoubleModal
        image={traffic_cone_icon}
        mainText={"삭제할까요?"}
        subText={"내가 작성한 수영장 리뷰를 삭제할게요."}
        isVisible={isDeleteModalVisible}
        setIsVisible={setIsDeleteModalVisible}
        leftButtonText={"취소"}
        onPressLeftButton={() => {
          setIsDeleteModalVisible(false)
        }}
        rightButtonText={"삭제"}
        onPressRightButton={() => {
          deleteReview()
        }}
      />
    )
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <SyeongStatusBar />
      <HaederWithTitle
        title={name}
        backgroundColor={"#FFFFFF"}
        icon={{
          source: trash_icon,
          style: {width: 24, height: 24},
          onPress: () => {
            setIsDeleteModalVisible(true)
          },
        }}
      />
      <ScrollView>
        {renderKeywordReview()}
        {renderTextReview()}
      </ScrollView>
      <View style={{paddingHorizontal: 20, marginTop: 20}}>
        <BasicButton
          backgroundColor={SyeongColors.main_3}
          text="수정하기"
          fullWidth
          margin={[0, 0, 16, 0]}
          textColor={SyeongColors.gray_1}
          onPress={() => {
            setIsModalVisible(true)
          }}
          disableTextColor={SyeongColors.main_2}
          disabled={!reviewTags.length || !reviewText.length}
        />
      </View>
      {renderEditModal()}
      {renderDeleteModal()}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    position: "absolute",
    top: 7,
    right: 20,
    zIndex: 10,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: SyeongColors.gray_8,
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 20.29,
    letterSpacing: -0.41,
  },
  titleRow: {
    marginTop: 48,
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  categoryTitle: {
    color: SyeongColors.main_4,
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 16.71,
    letterSpacing: -0.41,
    marginBottom: 5,
  },
  tagButton: {
    backgroundColor: SyeongColors.gray_1,
    borderRadius: 8,
    height: 40,
    paddingHorizontal: 13,
    paddingVertical: 11,
    marginVertical: 4,
    marginRight: 36,
  },
  tagButtonText: {
    color: SyeongColors.gray_8,
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 17.9,
    letterSpacing: -0.41,
  },
})

export default EditMyReviewScreen
