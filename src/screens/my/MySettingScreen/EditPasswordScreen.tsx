import React, {useState} from "react"
import {Alert, SafeAreaView, StatusBar, StyleSheet, View} from "react-native"
import {POST_EditPassword} from "../../../axios/auth"
import BasicButton from "../../../components/Button/BasicButton"
import {SyeongColors} from "../../../components/Colors"
import HaederWithTitle from "../../../components/Header/HeaderWithTitle"
import SyeongStatusBar from "../../../components/Header/SyeongStatusBar"
import BasicTextInput from "../../../components/TextInput/BasicTextInput"
import Title from "../../../components/Typography/Title"

const EditPasswordScreen = ({navigation, route}) => {
  const {pnum, requestId, verifycode} = route.params.data
  const [newPassword, setNewPassword] = useState<string>("")
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>("")

  const onPressButton = () => {
    requestEditPassword()
  }

  const requestEditPassword = async () => {
    try {
      const data = await POST_EditPassword(
        pnum,
        newPassword,
        verifycode,
        requestId,
      )
      navigation.goBack()
    } catch (err) {
      console.log(err)
      Alert.alert("비밀번호 변경에 실패했습니다. 다시 시도해주세요!")
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <SyeongStatusBar />
      <HaederWithTitle
        backgroundColor={SyeongColors.gray_1}
        title={"비밀번호 변경"}
      />
      <View style={styles.container}>
        <Title text="비밀번호 변경" margin={[0, 0, 24, 0]} />
        <BasicTextInput
          value={newPassword}
          placeholder="새로운 비밀번호 입력"
          margin={[0, 0, 8, 0]}
          secureTextEntry
          onChangeText={text => {
            setNewPassword(text)
          }}
        />
        <BasicTextInput
          value={newPasswordConfirm}
          placeholder="새로운 비밀번호 확인"
          secureTextEntry
          onChangeText={text => {
            setNewPasswordConfirm(text)
          }}
        />
        <BasicButton
          text="완료"
          fullWidth
          margin={[36, 0, 0, 0]}
          backgroundColor={SyeongColors.sub_2}
          textColor={SyeongColors.gray_8}
          disabled={
            newPassword.length < 6 || newPassword !== newPasswordConfirm
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

export default EditPasswordScreen
