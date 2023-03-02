import {View, Text, StyleSheet, SafeAreaView, StatusBar} from "react-native"
import React, {useState} from "react"
import {SyeongColors} from "../../../components/Colors"
import Title from "../../../components/Typography/Title"
import BasicTextInput from "../../../components/TextInput/BasicTextInput"
import BasicButton from "../../../components/Button/BasicButton"
import HaederWithTitle from "../../../components/Header/HeaderWithTitle"
import SyeongStatusBar from "../../../components/Header/SyeongStatusBar"

const PasswordSettingScreen = ({navigation, route}) => {
  const [password, setPassword] = useState<string>("")
  const [passwordConfirm, setPasswordConfirm] = useState<string>("")

  const onPressButton = () => {
    navigation.navigate("NicknameSettingScreen", {
      signUpData: {
        ...route.params.signUpData,
        password: password,
      },
    })
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <SyeongStatusBar />
      <HaederWithTitle
        backgroundColor={SyeongColors.gray_1}
        title={"회원가입"}
      />
      <View style={styles.container}>
        <Title text="비밀번호 설정" margin={[0, 0, 24, 0]} />
        <BasicTextInput
          value={password}
          placeholder="비밀번호 입력 (6자리 이상)"
          margin={[0, 0, 8, 0]}
          secureTextEntry
          onChangeText={text => {
            setPassword(text)
          }}
        />
        <BasicTextInput
          value={passwordConfirm}
          placeholder="비밀번호 확인"
          secureTextEntry
          onChangeText={text => {
            setPasswordConfirm(text)
          }}
        />
        <BasicButton
          text="완료"
          fullWidth
          margin={[36, 0, 0, 0]}
          backgroundColor={SyeongColors.sub_2}
          textColor={SyeongColors.gray_8}
          disabled={
            password.length < 6 ||
            passwordConfirm.length < 6 ||
            password !== passwordConfirm
          } //validation needed
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
})

export default PasswordSettingScreen
