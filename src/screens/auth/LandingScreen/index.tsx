import {View, Text, ImageBackground, StatusBar, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import React from 'react'
import landing_background from '../../../../assets/images/landing_background.png'
import {SyeongColors} from '../../../components/Colors'
import BasicButton from '../../../components/Button/BasicButton'

const LandingScreen = ({navigation}) => {
  return (
    <View style={styles.view}>
      <StatusBar barStyle={'light-content'} />
      <ImageBackground
        source={landing_background}
        style={styles.container}
        resizeMode="cover">
        <SafeAreaView style={styles.safeAreaView}>
          <View>
            <Text style={styles.title}>
              셩과 함께,{'\n'}숨겨진 수영장 맛집 찾아볼까요?
            </Text>
            <Text style={styles.subTitle}>로그인 후 셩 사용이 가능해요</Text>
          </View>
          <View>
            <BasicButton
              text="휴대폰 번호로 시작하기"
              backgroundColor={SyeongColors.sub_2}
              textColor={SyeongColors.gray_6}
              fullWidth
              margin={[0, 0, 12, 0]}
              onPress={() => {
                navigation.navigate('SignUpScreen')
              }}
            />
            <BasicButton
              text="로그인"
              backgroundColor={'transparent'}
              textColor={SyeongColors.sub_2}
              borderColor={SyeongColors.sub_2}
              fullWidth
              margin={[0, 0, 24, 0]}
              onPress={() => {
                navigation.navigate('SignInScreen')
              }}
            />
            <Text style={styles.smallText}>
              로그인 후 셩의 개인정보처리방침 및 이용약관에 동의{'\n'}하는
              것으로 간주합니다.
            </Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {flex: 1},
  container: {flex: 1, paddingHorizontal: 20},
  safeAreaView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    lineHeight: 33.6,
    letterSpacing: -0.41,
    fontWeight: '700',
    color: SyeongColors.gray_1,
    marginTop: 137,
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 16,
    lineHeight: 19.09,
    letterSpacing: -0.41,
    fontWeight: '500',
    color: SyeongColors.gray_2,
  },
  smallText: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16.8,
    letterSpacing: -0.41,
    color: SyeongColors.gray_3,
    textAlign: 'center',
  },
})

export default LandingScreen
