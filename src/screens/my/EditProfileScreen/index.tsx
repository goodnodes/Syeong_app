import {View, Text, StyleSheet, TextInput} from 'react-native'
import React from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import Header from '../../../components/Header/Header'
import {SyeongColors} from '../../../components/Colors'
import BackButton from '../../../components/Button/BackButton'
import BasicButton from '../../../components/Button/BasicButton'

const EditProfileScreen = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Header backgroundColor={SyeongColors.gray_1}>
        <View style={styles.backButton}>
          <BackButton />
        </View>
        <View style={styles.header}>
          <Text style={styles.title}>프로필 편집</Text>
        </View>
      </Header>
      <View style={styles.container}>
        <View style={styles.component}>
          <Text style={styles.componentTitle}>닉네임</Text>
          <TextInput style={styles.nickNameTextInput} />
        </View>
        <View style={styles.component}>
          <Text style={styles.componentTitle}>목표</Text>
          <TextInput
            style={styles.objectiveTextInput}
            placeholder="나만의 운동 목표를 정해 봐요!"
            placeholderTextColor={SyeongColors.gray_4}
            multiline
          />
        </View>

        </View>
        <View style={styles.buttonRow}>
      <BasicButton
        backgroundColor={SyeongColors.sub_2}
        text="저장하기"
        textColor={SyeongColors.gray_8}
        fullWidth
        // margin={[0, 20, 0, 20]}
        />
        </View>
    </SafeAreaView>
  )
}

export default EditProfileScreen

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: SyeongColors.gray_1,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 7,
    left: 20,
    zIndex: 10,
  },
  title: {
    color: SyeongColors.gray_8,
    fontSize: 17,
    lineHeight: 20.29,
    letterSpacing: -0.41,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 12,
  },
  component: {
    marginTop: 36,
  },
  componentTitle: {
    color: SyeongColors.gray_8,
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 20.29,
    letterSpacing: -0.41,
    marginBottom: 16,
  },
  nickNameTextInput: {
    width: '100%',
    height: 43,
    borderRadius: 8,
    backgroundColor: SyeongColors.gray_2,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 19.09,
    letterSpacing: -0.41,
    paddingHorizontal: 16,
  },
  objectiveTextInput: {
    width: '100%',
    height: 96,
    borderRadius: 8,
    backgroundColor: SyeongColors.gray_2,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 19.09,
    letterSpacing: -0.41,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },buttonRow:{
    marginTop: 'auto',
    paddingHorizontal: 20
  }
})
