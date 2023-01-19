import React, {useState} from "react"
import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native"
import {POST_Pnum_Request} from "../../../axios/auth"
import BackButton from "../../../components/Button/BackButton"
import BasicButton from "../../../components/Button/BasicButton"
import {SyeongColors} from "../../../components/Colors"
import Header from "../../../components/Header/Header"
import BasicTextInput from "../../../components/TextInput/BasicTextInput"
import Title from "../../../components/Typography/Title"

const SignUpScreen = ({navigation}) => {
  const [pnum, setPnum] = useState<string>("")
  const [isInValid, setIsInValid] = useState<boolean>(false)

  const onPressButton = () => {
    requestMessageAuthenticate()
  }

  const requestMessageAuthenticate = async () => {
    try {
      const data = await POST_Pnum_Request(pnum)
      console.log(data)
      navigation.navigate("ValidateNumberScreen", {
        signUpData: {
          pnum,
          requestId: data.requestId,
          requestTime: data.requestTime,
        },
      })
    } catch (err: any) {
      if (err.response.data.msg === "already exist") {
        // Alert.alert("회원가입", "이미 존재하는 번호입니다")
        setIsInValid(true)
      } else {
        Alert.alert("회원가입", "다시 시도해주세요")
      }
      // console.log(err)
    }
  }
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar barStyle={"dark-content"} />
      <Header backgroundColor={SyeongColors.gray_1}>
        <BackButton />
      </Header>
      <View style={styles.container}>
        <Title text="휴대폰 번호 입력" margin={[0, 0, 24, 0]} />
        <BasicTextInput
          value={pnum}
          onChangeText={text => {
            setPnum(text)
          }}
          keyboardType={"number-pad"}
          borderColor={isInValid ? SyeongColors.red_1 : ""}
        />
        {isInValid ? (
          <Text style={styles.invalidText}>이미 존재하는 번호입니다</Text>
        ) : (
          <Text style={styles.subText}>
            다음을 누르면 입력한 번호로 인증번호를 전송돼요
          </Text>
        )}
        <BasicButton
          text="다음"
          fullWidth
          margin={[36, 0, 0, 0]}
          backgroundColor={SyeongColors.sub_2}
          textColor={SyeongColors.gray_8}
          disabled={pnum.length !== 11} //validation needed
          onPress={onPressButton}
        />
      </View>
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
    marginTop: 12,
  },
  invalidText: {
    color: SyeongColors.red_1,
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 16.71,
    letterSpacing: -0.41,
    marginTop: 12,
  },
})

export default SignUpScreen
