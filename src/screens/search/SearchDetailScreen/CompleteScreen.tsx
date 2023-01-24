import {View, Text, SafeAreaView, StyleSheet, StatusBar} from 'react-native'
import React from 'react'
import {SyeongColors} from '../../../components/Colors'
import Header from '../../../components/Header/Header'
import Image from '../../../components/Image/Image'
import {check_circle} from '../../../../assets/icons'
import BasicButton from '../../../components/Button/BasicButton'

const CompleteScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar barStyle={'dark-content'} />
      <Header backgroundColor={SyeongColors.gray_1}>
        <View style={styles.header}>
          <Text style={styles.headerText}>리뷰 작성하기</Text>
        </View>
      </Header>
      <View style={styles.contentView}>
        <Image source={check_circle} style={{width: 80, height: 80}} />
        <Text
          style={{
            marginTop: 36,
            color: SyeongColors.gray_8,
            fontSize: 18,
            fontWeight: '600',
            lineHeight: 21.48,
            letterSpacing: -0.41,
          }}>
          리뷰 등록 완료!
        </Text>
        <Text
          style={{
            color: SyeongColors.gray_4,
            fontSize: 16,
            fontWeight: '500',
            lineHeight: 22.4,
            letterSpacing: -0.41,
            textAlign: 'center',
            marginTop: 12,
          }}>
          내가 작성한 리뷰를 성공적으로 등록했어요{'\n'}내 정보에서 수정 및
          삭제가 가능해요
        </Text>
      </View>
      <View style={{marginHorizontal: 20, marginTop: 'auto'}}>
        <BasicButton
          text="확인"
          textColor={SyeongColors.gray_1}
          backgroundColor={SyeongColors.main_3}
          fullWidth
          margin={[0,0,16,0]}
          onPress={() => {
            navigation.goBack()
          }}
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
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: SyeongColors.gray_8,
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 20.29,
    letterSpacing: -0.41,
  },
  contentView: {
    alignItems: 'center',
    marginTop: 160,
  },
})

export default CompleteScreen
