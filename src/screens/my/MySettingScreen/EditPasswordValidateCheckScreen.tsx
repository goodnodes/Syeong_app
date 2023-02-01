import React, { useState } from "react"
import { Alert, StatusBar, StyleSheet, Text, View } from "react-native"
import OtpInputs from "react-native-otp-inputs"
import { SafeAreaView } from "react-native-safe-area-context"
import { timer_icon } from "../../../../assets/icons"
import { POST_Validation_Check } from "../../../axios/auth"
import BasicButton from "../../../components/Button/BasicButton"
import { SyeongColors } from "../../../components/Colors"
import HaederWithTitle from "../../../components/Header/HeaderWithTitle"
import SingleModal from "../../../components/Modal/SingleModal"
import Title from "../../../components/Typography/Title"

const EditPasswordValidateCheckScreen = ({navigation, route}) => {
  const {pnum, requestId, requestTime} = route.params.data
  const [validateNum, setValidateNum] = useState<string>("")
  const [isInValid, setIsInValid] = useState<boolean>(false)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  // console.log(requestId, requestTime)

  const onPressButton = () => {
    validateCode()
  }

  const validateCode = async () => {
    try {
      const data = await POST_Validation_Check(
        validateNum,
        requestId,
        requestTime,
      )
      console.log(data)
      if (data.msg === "verified") {
        navigation.replace("EditPasswordScreen", {
          data: {
            pnum,
            requestId,
            verifycode: data.verifycode,
          },
        })
      }
    } catch (err: any) {
      if (err.response.data.msg === "time over") {
        setIsModalVisible(true)
      } else if (err.response.data.msg === "unverified") {
        setIsInValid(true)
      } else {
        Alert.alert("비밀번호 변경", "다시 시도해주세요")
      }
    }
  }

  // const reSendAuthenticate =async () =>{

  // }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar barStyle={"dark-content"} />
      <HaederWithTitle
        backgroundColor={SyeongColors.gray_1}
        title={"비밀번호 변경"}
      />
      <View style={styles.container}>
        <Title text="인증번호 입력" margin={[0, 0, 24, 0]} />
        <View>
          <OtpInputs
            autofillFromClipboard
            handleChange={code => {
              setValidateNum(code)
            }}
            numberOfInputs={4}
            keyboardType="phone-pad"
            inputStyles={[
              styles.textInput,
              isInValid
                ? {borderColor: SyeongColors.red_1, borderWidth: 1.5}
                : null,
            ]}
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "center",
            }}
            autoFocus
          />
        </View>
        <View style={styles.marginBelowOtp}>
          {isInValid && (
            <Text style={styles.invalidText}>
              인증번호가 잘못 입력되었습니다.
            </Text>
          )}
        </View>
        <BasicButton
          text="다음"
          fullWidth
          margin={[24, 0, 24, 0]}
          backgroundColor={SyeongColors.sub_2}
          textColor={SyeongColors.gray_8}
          disabled={validateNum.length !== 4} //validation needed
          disableTextColor={SyeongColors.sub_OFF_1}
          onPress={onPressButton}
        />
        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
          <Text style={styles.subText}>
            전송된 인증번호는 10분 안에 인증이 만료돼요
          </Text>
          {/* <View style={{flexDirection: 'row'}}>
            <Text style={styles.subText}>9:95</Text>
            <TouchableOpacity onPress={}>
              <Text
                style={[
                  styles.subText,
                  {textDecorationLine: 'underline', marginLeft: 8},
                ]}>
                재전송
              </Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
      <SingleModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        image={timer_icon}
        mainText={"인증 시간 10분이 지났네요!"}
        subText={"휴대폰 번호 입력을 다시 시도해 주세요"}
        buttonText={"확인"}
        onPressButton={() => {
          setIsModalVisible(false)
          navigation.navigate("SignUpScreen")
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: SyeongColors.gray_1,
  },
  container: {
    flex: 1,
    marginTop: 62,
    paddingHorizontal: 20,
  },
  subText: {
    color: SyeongColors.gray_4,
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 16.71,
    letterSpacing: -0.41,
  },
  validateNumberRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  textInput: {
    backgroundColor: SyeongColors.gray_2,
    width: 67.77,
    height: 68,
    borderRadius: 6.97,
    textAlign: "center",
    fontSize: 22.23,
    lineHeight: 26.53,
    letterSpacing: -0.53,
    fontWeight: "600",
    marginHorizontal: 4,
  },
  marginBelowOtp: {
    height: 17,
    marginTop: 7,
  },
  invalidText: {
    color: SyeongColors.red_1,
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 16.71,
    letterSpacing: -0.41,
    marginTop: 12,
    height: 17,
  },
})

export default EditPasswordValidateCheckScreen
