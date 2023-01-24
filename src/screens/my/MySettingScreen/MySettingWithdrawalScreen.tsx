import {View, Text, SafeAreaView, StatusBar, StyleSheet} from "react-native"
import React from "react"
import {SyeongColors} from "../../../components/Colors"
import BackButton from "../../../components/Button/BackButton"
import Header from "../../../components/Header/Header"
import BasicButton from "../../../components/Button/BasicButton"

const MySettingWithdrawalScreen = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar barStyle={"dark-content"} />
      <Header backgroundColor={SyeongColors.gray_1}>
        <View style={styles.backButton}>
          <BackButton />
        </View>
        <View style={styles.header}>
          <Text style={styles.title}>계정 탈퇴하기</Text>
        </View>
      </Header>
      <Text
        style={{
          marginTop: 69,
          textAlign: "center",
          fontSize: 18,
          fontWeight: "600",
          lineHeight: 21.48,
          letterSpacing: -0.41,
          color: SyeongColors.gray_7,
          marginBottom: 16,
        }}>
        셩에서 추후에 더 유용한 정보를 제공 드려요!
      </Text>
      <View style={styles.box}>
        <Text
          style={{
            color: SyeongColors.gray_7,
            fontSize: 15,
            fontWeight: "600",
            lineHeight: 17.9,
            letterSpacing: -0.41,
          }}>
          🎉 수영 기록 아카이빙 및 공유
        </Text>
      </View>
      <View style={styles.box}>
        <Text
          style={{
            color: SyeongColors.gray_7,
            fontSize: 15,
            fontWeight: "600",
            lineHeight: 17.9,
            letterSpacing: -0.41,
          }}>
          🏊‍ 수영 커뮤니티
        </Text>
      </View>
      <View style={styles.box}>
        <Text
          style={{
            color: SyeongColors.gray_7,
            fontSize: 15,
            fontWeight: "600",
            lineHeight: 17.9,
            letterSpacing: -0.41,
          }}>
          + 셩만의 다양한 혜택
        </Text>
      </View>
      <View style={{marginHorizontal: 16, marginTop: 'auto'}}>

      <BasicButton
        text={"그럼에도 탈퇴하기"}
        textColor={SyeongColors.gray_4}
        backgroundColor={SyeongColors.gray_1}
        fullWidth
        margin={[0,0,16,0]}
        onPress={()=>{}}
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
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 7,
    left: 20,
    zIndex: 10,
  },
  title: {
    color: SyeongColors.gray_8,
    fontSize: 17,
    lineHeight: 20.29,
    letterSpacing: -0.41,
    fontWeight: "600",
  },
  box: {
    marginVertical: 4,
    height: 80,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginHorizontal: 20,
    flexDirection: "row",
    backgroundColor: SyeongColors.gray_1,
    borderRadius: 8,
    shadowColor: "#8B95A199",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19,
  },
})

export default MySettingWithdrawalScreen
