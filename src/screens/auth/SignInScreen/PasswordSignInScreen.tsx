import {View, Text, StatusBar, StyleSheet, Alert} from "react-native"
import React, {useState} from "react"
import {SafeAreaView} from "react-native-safe-area-context"
import CookieManager from "@react-native-cookies/cookies"
import Title from "../../../components/Typography/Title"
import BasicTextInput from "../../../components/TextInput/BasicTextInput"
import BasicButton from "../../../components/Button/BasicButton"
import {SyeongColors} from "../../../components/Colors"
import {useSetRecoilState} from "recoil"
import {authAtom} from "../../../atoms/auth"
import {POST_SignIn} from "../../../axios/auth"
import HaederWithTitle from "../../../components/Header/HeaderWithTitle"
import Config from "react-native-config"
import SyeongStatusBar from "../../../components/Header/SyeongStatusBar"
import { SERVER_URL } from "../../../../config"

const PasswordSignInScreen = ({navigation, route}) => {
  const {pnum} = route.params
  const [password, setPassword] = useState<string>("")
  const [isInValid, setIsInValid] = useState<boolean>(false)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const setIsLoggedIn = useSetRecoilState(authAtom)

  const onPressButton = () => {
    requestSignIn()
  }

  const requestSignIn = async () => {
    if (isFetching) return
    try {
      setIsFetching(true)
      const data = await POST_SignIn(pnum, password)
      const result = await CookieManager.setFromResponse(
        SERVER_URL,
        data.headers["set-cookie"]?.[0].split("Domain=localhost; ").join(""),
      )
      setIsLoggedIn(true)
    } catch (err: any) {
      if (err.response.data.err === "invalid") {
        setIsInValid(true)
        // Alert.alert('로그인', '잘못된 비밀번호입니다. 다시 시도해주세요')
      } else {
        Alert.alert("로그인", "다시 시도해주세요")
      }
    } finally {
      setIsFetching(false)
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <SyeongStatusBar />
      <HaederWithTitle backgroundColor={SyeongColors.gray_1} title={"로그인"} />
      <View style={styles.container}>
        <Title text="비밀번호 입력" margin={[0, 0, 24, 0]} />
        <BasicTextInput
          value={password}
          placeholder="비밀번호 입력"
          margin={[0, 0, 0, 0]}
          secureTextEntry
          onChangeText={text => {
            setPassword(text)
          }}
          borderColor={isInValid ? SyeongColors.red_1 : ""}
        />
        <View style={styles.marginBelowOtp}>
          {isInValid && (
            <Text style={styles.invalidText}>
              비밀번호가 잘못 입력되었습니다.
            </Text>
          )}
        </View>
        <BasicButton
          text="로그인"
          fullWidth
          margin={[36, 0, 0, 0]}
          backgroundColor={SyeongColors.sub_2}
          textColor={SyeongColors.gray_8}
          disabled={!password} //validation needed
          disableTextColor={SyeongColors.sub_OFF_1}
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
  marginBelowOtp: {
    height: 17,
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

export default PasswordSignInScreen
