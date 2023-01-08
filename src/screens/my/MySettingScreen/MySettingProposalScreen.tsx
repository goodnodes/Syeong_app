import {View, Text, StyleSheet} from 'react-native'
import React from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import Header from '../../../components/Header/Header'
import {SyeongColors} from '../../../components/Colors'
import BackButton from '../../../components/Button/BackButton'
import BasicButton from '../../../components/Button/BasicButton'

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
      <View
        style={{
          marginTop: 50,
          height: 80,
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 16,
          marginHorizontal: 20,
          flexDirection: 'row',
          backgroundColor: SyeongColors.gray_1,
          borderRadius: 8,
          shadowColor: '#C5CCD399',
          shadowOffset: {
            width: 0,
            height: 9,
          },
          shadowOpacity: 0.5,
          shadowRadius: 12.35,

          elevation: 19,
        }}>
        <Text
          style={{
            color: SyeongColors.gray_7,
            fontSize: 15,
            fontWeight: '600',
            lineHeight: 17.9,
            letterSpacing: -0.41,
          }}>
          👍 정보 수정 제안
        </Text>
        <BasicButton
          text="구글폼 바로가기"
          backgroundColor={SyeongColors.sub_4}
          textColor={SyeongColors.gray_1}
          borderRadius={8}
          borderWidth={1}
          borderColor={SyeongColors.main_3}
          width={126}
          height={36}
          onPress={() => {}}
        />
      </View>
      <View
        style={{
          marginTop: 8,
          height: 80,
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 16,
          marginHorizontal: 20,
          flexDirection: 'row',
          backgroundColor: SyeongColors.gray_1,
          borderRadius: 8,
          shadowColor: '#C5CCD399',
          shadowOffset: {
            width: 0,
            height: 9,
          },
          shadowOpacity: 0.5,
          shadowRadius: 12.35,

          elevation: 19,
        }}>
        <Text
          style={{
            color: SyeongColors.gray_7,
            fontSize: 15,
            fontWeight: '600',
            lineHeight: 17.9,
            letterSpacing: -0.41,
          }}>
          ☎️ 문의하기
        </Text>
        <BasicButton
          text="카카오톡 바로가기"
          backgroundColor={SyeongColors.sub_4}
          textColor={SyeongColors.gray_1}
          borderRadius={8}
          borderWidth={1}
          borderColor={SyeongColors.main_3}
          width={140}
          height={36}
          onPress={() => {}}
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
})

export default MySettingProposalScreen
