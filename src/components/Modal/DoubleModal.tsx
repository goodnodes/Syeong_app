import {View, Text} from "react-native"
import React from "react"
import Modal from "react-native-modal"
import Image from "../Image/Image"
import {FastImageProps} from "react-native-fast-image"
import {traffic_cone_icon} from "../../../assets/icons"
import {SyeongColors} from "../Colors"
import BasicButton from "../Button/BasicButton"

interface Props {
  isVisible: boolean
  setIsVisible: (value: boolean) => void
  image?: FastImageProps["source"]
  mainText?: string
  subText?: string
  leftButtonText?: string
  rightButtonText?: string
  onPressLeftButton: () => void
  onPressRightButton: () => void
}

const DoubleModal = (props: Props) => {
  const {
    isVisible,
    setIsVisible,
    image,
    mainText,
    subText,
    leftButtonText,
    onPressLeftButton,
    rightButtonText,
    onPressRightButton,
  } = props

  return (
    <Modal
      animationIn={"zoomIn"}
      animationOut={"zoomOut"}
      isVisible={isVisible}
      onBackButtonPress={() => {
        setIsVisible(false)
      }}
      onBackdropPress={() => {
        setIsVisible(false)
      }}
      style={{justifyContent: "center", alignItems: "center"}}
      backdropColor="#74747480">
      <View
        style={{
          backgroundColor: SyeongColors.gray_1,
          borderRadius: 15,
          paddingHorizontal: 16,
          alignItems: "center",
        }}>
        <Image
          source={image || traffic_cone_icon}
          style={{width: 60, height: 60, marginTop: 27, marginBottom: 16}}
        />
        <Text
          style={{
            color: SyeongColors.gray_8,
            fontSize: 16,
            fontWeight: "600",
            lineHeight: 19.09,
            letterSpacing: -0.41,
            marginBottom: 8,
          }}>
          {mainText || " 로그아웃할까요?"}
        </Text>
        <Text
          style={{
            color: SyeongColors.gray_4,
            fontSize: 14,
            fontWeight: "500",
            lineHeight: 19.6,
            letterSpacing: -0.41,
            textAlign: "center",
            marginBottom: 36,
          }}>
          {subText ||
            "계정에서 로그아웃할게요{'\n'}휴대폰 번호를 통해 다시 로그인할 수 있어요"}
        </Text>
        <View style={{flexDirection: "row", marginBottom: 16}}>
          <BasicButton
            width={136}
            height={44}
            text={leftButtonText || "아니요"}
            backgroundColor={SyeongColors.gray_3}
            textColor={SyeongColors.gray_5}
            textSize={17}
            margin={[0, 15, 0, 0]}
            borderRadius={8}
            onPress={onPressLeftButton}
          />
          <BasicButton
            width={136}
            height={44}
            text={rightButtonText || "로그아웃"}
            backgroundColor={SyeongColors.main_3}
            textColor={SyeongColors.gray_1}
            textSize={17}
            borderRadius={8}
            onPress={onPressRightButton}
          />
        </View>
      </View>
    </Modal>
  )
}

export default DoubleModal
