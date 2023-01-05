import {View, Text, StyleSheet, StatusBar, } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../../components/Header/Header'
import { SyeongColors } from '../../../components/Colors'

const SearchMainScreen = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar barStyle={'dark-content'}/>
      <Text>SearchMainScreen</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: SyeongColors.gray_1
  }
})

export default SearchMainScreen
