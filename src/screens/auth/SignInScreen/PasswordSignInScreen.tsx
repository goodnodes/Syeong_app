import {View, Text, StatusBar, StyleSheet} from 'react-native'
import React, {useState} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import Header from '../../../components/Header/Header'
import BackButton from '../../../components/Button/BackButton'
import Title from '../../../components/Typography/Title'
import BasicTextInput from '../../../components/TextInput/BasicTextInput'
import BasicButton from '../../../components/Button/BasicButton'
import {SyeongColors} from '../../../components/Colors'
import {useSetRecoilState} from 'recoil'
import {authAtom} from '../../../atoms/auth'

const PasswordSignInScreen = ({navigation, route}) => {
  const [password, setPassword] = useState<string>('')
  const setIsLoggedIn = useSetRecoilState(authAtom)

  const onPressButton = () => {
    navigation.navigate('MainTabScreen')
    setIsLoggedIn(true)
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar barStyle={'dark-content'} />
      <Header backgroundColor={SyeongColors.gray_1}>
        <BackButton />
      </Header>
      <View style={styles.container}>
        <Title text="비밀번호 입력" margin={[0, 0, 24, 0]} />
        <BasicTextInput
          value={password}
          placeholder="비밀번호 입력"
          margin={[0, 0, 8, 0]}
          secureTextEntry
          onChangeText={text => {
            setPassword(text)
          }}
        />
        <BasicButton
          text="로그인"
          fullWidth
          margin={[36, 0, 0, 0]}
          backgroundColor={SyeongColors.sub_2}
          textColor={SyeongColors.gray_8}
          disabled={!password} //validation needed
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

export default PasswordSignInScreen
