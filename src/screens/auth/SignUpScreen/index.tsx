import {View, Text, StyleSheet, StatusBar} from 'react-native'
import React, {useState} from 'react'
import {SafeAreaView} from 'react-native'
import Header from '../../../components/Header/Header'
import BackButton from '../../../components/Button/BackButton'
import {SyeongColors} from '../../../components/Colors'
import Title from '../../../components/Typography/Title'
import BasicTextInput from '../../../components/TextInput/BasicTextInput'
import BasicButton from '../../../components/Button/BasicButton'

const SignUpScreen = ({navigation}) => {
  const [pNum, setPNum] = useState<string>('')

  const onPressButton = () => {
    navigation.navigate('ValidateNumberScreen', {signUpData: {pNum}})
  }
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar barStyle={'dark-content'} />
      <Header backgroundColor={SyeongColors.gray_1}>
        <BackButton />
      </Header>
      <View style={styles.container}>
        <Title text="휴대폰 번호 입력" margin={[0, 0, 24, 0]} />
        <BasicTextInput
          value={pNum}
          onChangeText={text => {
            setPNum(text)
          }}
          keyboardType={'number-pad'}
        />
        <Text style={styles.subText}>
          다음을 누르면 입력한 번호로 인증번호를 전송돼요
        </Text>
        <BasicButton
          text="다음"
          fullWidth
          margin={[36, 0, 0, 0]}
          backgroundColor={SyeongColors.sub_2}
          textColor={SyeongColors.gray_8}
          disabled={pNum.length !== 11} //validation needed
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

export default SignUpScreen
