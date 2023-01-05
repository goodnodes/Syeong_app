import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { SyeongColors } from '../../../components/Colors'
import Header from '../../../components/Header/Header'
import BackButton from '../../../components/Button/BackButton'
import Title from '../../../components/Typography/Title'
import BasicTextInput from '../../../components/TextInput/BasicTextInput'
import BasicButton from '../../../components/Button/BasicButton'
import { useSetRecoilState } from 'recoil'
import { authAtom } from '../../../atoms/auth'

const NicknameSettingScreen = ({navigation, route}) => {
const [nickname, setNickname] = useState<string>('')
const setAuthAtom = useSetRecoilState(authAtom)

  const onPressButton = () => {
navigation.navigate('MainTabScreen')
setAuthAtom(true)
  }
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar barStyle={'dark-content'} />
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
        />
        <Text style={styles.subText}>
          언제든 프로필을 수정할 수 있어요
        </Text>
        <BasicButton
          text="시작하기"
          fullWidth
          margin={[36,0,0,0]}
          backgroundColor={SyeongColors.sub_2}
          textColor={SyeongColors.gray_8}
          disabled={!nickname}//validation needed
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
    fontWeight: '500',
    lineHeight: 16.71,
    letterSpacing: -0.41,
    marginTop: 12,
  },
})

export default NicknameSettingScreen