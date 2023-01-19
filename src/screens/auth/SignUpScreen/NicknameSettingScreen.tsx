import React, { useState } from "react"
import {
  Alert, SafeAreaView,
  StatusBar, StyleSheet, Text, View
} from "react-native"
import { useSetRecoilState } from "recoil"
import { authAtom } from "../../../atoms/auth"
import { POST_Signup } from "../../../axios/auth"
import BackButton from "../../../components/Button/BackButton"
import BasicButton from "../../../components/Button/BasicButton"
import { SyeongColors } from "../../../components/Colors"
import Header from "../../../components/Header/Header"
import BasicTextInput from "../../../components/TextInput/BasicTextInput"
import Title from "../../../components/Typography/Title"

const NicknameSettingScreen = ({navigation, route}) => {
  const {pnum, requestId, verifycode, password} = route.params.signUpData
  const [nickname, setNickname] = useState<string>("")
  const [isInValid, setIsInValid] = useState<boolean>(false)
  const setAuthAtom = useSetRecoilState(authAtom)

  const onPressButton = () => {
    // navigation.navigate('MainTabScreen')
    // setAuthAtom(true)
    requestSignUp()
  }
  const requestSignUp = async () => {
    try {
      const data = await POST_Signup(pnum, password, nickname, verifycode, requestId) 
      setAuthAtom(true)
    } catch (err: any) {
      if (err.response.data.msg === "already exist") {
        setIsInValid(true)
      } else {
        Alert.alert("회원가입", "가입에 실패했습니다. 다시 시도해주세요.")
      }
    }
  }
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar barStyle={"dark-content"} />
      <Header backgroundColor={SyeongColors.gray_1}>
        <BackButton />
      </Header>
      <View style={styles.container}>
        <Title text="닉네임 설정" margin={[0, 0, 24, 0]} />
        <BasicTextInput
          value={nickname}
          onChangeText={text => {
            setNickname(text)
          }}
          borderColor={isInValid ? SyeongColors.red_1 : ""}
          maxLength={20}
        />
        {isInValid ? (
          <Text style={styles.invalidText}>이미 있는 닉네임입니다</Text>
        ) : (
          <Text style={styles.subText}>언제든 프로필을 수정할 수 있어요</Text>
        )}
        <BasicButton
          text="시작하기"
          fullWidth
          margin={[36, 0, 0, 0]}
          backgroundColor={SyeongColors.sub_2}
          textColor={SyeongColors.gray_8}
          disabled={!nickname} //validation needed
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

export default NicknameSettingScreen
