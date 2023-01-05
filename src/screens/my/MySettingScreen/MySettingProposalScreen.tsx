import {View, Text, StyleSheet} from 'react-native'
import React from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import Header from '../../../components/Header/Header'
import {SyeongColors} from '../../../components/Colors'
import BackButton from '../../../components/Button/BackButton'

const MySettingProposalScreen = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Header backgroundColor={SyeongColors.gray_1}>
        <View style={styles.backButton}>
          <BackButton />
        </View>
        <View style={styles.header}>
          <Text style={styles.title}>정보 수정 제안하기</Text>
        </View>
      </Header>
      <Text>MySettingProposalScreen</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: SyeongColors.gray_1,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton:{
position: 'absolute', top: 7, left: 20, zIndex: 10
  },
  title: {
    color: SyeongColors.gray_8,
    fontSize: 17,
    lineHeight: 20.29,
    letterSpacing: -0.41,
    fontWeight: '600',
  },
})

export default MySettingProposalScreen
