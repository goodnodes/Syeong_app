import React, { useState } from 'react'
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRecoilState } from 'recoil'
import { user } from '../../../atoms/auth'
import { POST_EditMyInfo } from '../../../axios/user'
import BasicButton from '../../../components/Button/BasicButton'
import { SyeongColors } from '../../../components/Colors'
import HaederWithTitle from '../../../components/Header/HeaderWithTitle'

const EditProfileScreen = ({navigation}) => {
  const [userAtom, setUserAtom] = useRecoilState(user)
  const [nickname, setNickname] = useState<string>(userAtom.privateinfo.nickname)
  const [goal, setGoal] = useState<string>(userAtom.privateinfo.goal || '')

  const updateUserProfile = async()=>{
    try{
      const data = await POST_EditMyInfo(userAtom.privateinfo.nickname, nickname, goal)
      navigation.pop()
    }catch(err){
      Alert.alert('프로필 편집', '실패했습니다! 다시 시도해주세요')
      console.log(err)
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <HaederWithTitle backgroundColor={SyeongColors.gray_1} title={'프로필 편집'}/>
      <View style={styles.container}>
        <View style={styles.component}>
          <Text style={styles.componentTitle}>닉네임</Text>
          <TextInput
            value={nickname}
            defaultValue={userAtom.privateinfo.nickname}
            onChangeText={text => {
              setNickname(text)
            }}
            style={styles.nickNameTextInput}
          />
        </View>
        <View style={styles.component}>
          <Text style={styles.componentTitle}>목표</Text>
          <View style={styles.goalView}>
            <TextInput
              style={styles.goalTextInput}
              defaultValue={userAtom.privateinfo.goal||''}
              placeholder="나만의 운동 목표를 정해 봐요!"
              placeholderTextColor={SyeongColors.gray_4}
              multiline
              value={goal}
              onChangeText={text => {
                setGoal(text)
              }}
              maxLength={40}
              autoComplete="off"
              autoCorrect={false}
            />
            <Text
              style={{
                color: SyeongColors.gray_4,
                fontSize: 16,
                fontWeight: '600',
                lineHeight: 19.09,
                letterSpacing: -0.41,
                position: 'absolute',
                bottom: 16,
                right: 16,
              }}>
              {goal.length} / 40
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonRow}>
        <BasicButton
          backgroundColor={SyeongColors.sub_2}
          text="저장하기"
          margin={[0,0,16,0]}
          textColor={SyeongColors.gray_8}
          fullWidth
          onPress={() => {
            updateUserProfile()
          }}
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
  goalView: {
    height: 96,
    width: '100%',
    borderRadius: 8,
    backgroundColor: SyeongColors.gray_2,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  goalTextInput: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 19.09,
    letterSpacing: -0.41,
  },
  buttonRow: {
    marginTop: 'auto',
    paddingHorizontal: 20,
  },
})
