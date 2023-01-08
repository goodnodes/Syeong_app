import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import React, {useState} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import OtpInputs from 'react-native-otp-inputs'
import {SyeongColors} from '../../../components/Colors'
import Header from '../../../components/Header/Header'
import BackButton from '../../../components/Button/BackButton'
import Title from '../../../components/Typography/Title'
import BasicButton from '../../../components/Button/BasicButton'

const ValidateNumberScreen = ({navigation, route}) => {
  const [validateNum, setValidateNum] = useState<string>('')

  const onPressButton = () => {
    navigation.navigate('PasswordSettingScreen', {
      signUpData: {
        ...route.params.signUpData,
        validateNum: validateNum,
      },
    })
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar barStyle={'dark-content'} />
      <Header backgroundColor={SyeongColors.gray_1}>
        <BackButton />
      </Header>
      <View style={styles.container}>
        <Title text="인증번호 입력" margin={[0, 0, 24, 0]} />
        <View>
          <OtpInputs
            handleChange={code => {
              setValidateNum(code)
            }}
            numberOfInputs={4}
            keyboardType="phone-pad"
            inputStyles={styles.textInput}
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
            autoFocus
          />
        </View>

        <BasicButton
          text="다음"
          fullWidth
          margin={[49, 0, 24, 0]}
          backgroundColor={SyeongColors.sub_2}
          textColor={SyeongColors.gray_8}
          disabled={validateNum.length !== 4} //validation needed
          onPress={onPressButton}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.subText}>
            전송된 인증번호는 10분 안에 인증이 만료돼요
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.subText}>9:95</Text>
            <TouchableOpacity>
              <Text
                style={[
                  styles.subText,
                  {textDecorationLine: 'underline', marginLeft: 8},
                ]}>
                재전송
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
  },
  validateNumberRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textInput: {
    backgroundColor: SyeongColors.gray_2,
    width: 67.77,
    height: 68,
    borderRadius: 6.97,
    textAlign: 'center',
    fontSize: 22.23,
    lineHeight: 26.53,
    letterSpacing: -0.53,
    fontWeight: '600',
    marginHorizontal: 4,
  },
})

export default ValidateNumberScreen
