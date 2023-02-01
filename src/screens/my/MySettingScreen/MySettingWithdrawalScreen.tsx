import React, {useState} from "react"
import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native"
import {traffic_cone_icon} from "../../../../assets/icons"
import {DELETE_DeleteUserAccount} from "../../../axios/user"
import BasicButton from "../../../components/Button/BasicButton"
import {SyeongColors} from "../../../components/Colors"
import HaederWithTitle from "../../../components/Header/HeaderWithTitle"
import DoubleModal from "../../../components/Modal/DoubleModal"
import {useSignOut} from "../../../hooks/useAuth"

const MySettingWithdrawalScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const requestWithdrawal = async () => {
    try {
      await DELETE_DeleteUserAccount()
      useSignOut()
    } catch (err) {
      Alert.alert("탈퇴 요청에 실패했습니다. 다시 시도해주세요")
      console.log(err)
    }
  }
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar barStyle={"dark-content"} />

      <HaederWithTitle
        backgroundColor={SyeongColors.gray_1}
        title="계정 탈퇴하기"
      />
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
      <View style={{marginHorizontal: 16, marginTop: "auto"}}>
        <BasicButton
          text={"그럼에도 탈퇴하기"}
          textColor={SyeongColors.gray_4}
          backgroundColor={SyeongColors.gray_1}
          fullWidth
          margin={[0, 0, 16, 0]}
          onPress={() => {
            setIsModalVisible(true)
          }}
        />
      </View>
      <DoubleModal
        image={traffic_cone_icon}
        mainText={"계정 탈퇴할까요?"}
        subText={"셩에서 탈퇴할게요\n계정 가입 정보는 영구적으로 삭제합니다"}
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        leftButtonText={"아니요"}
        onPressLeftButton={() => {
          setIsModalVisible(false)
        }}
        rightButtonText={"탈퇴하기"}
        onPressRightButton={requestWithdrawal}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: SyeongColors.gray_1,
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
      height: 6,
    },
    shadowOpacity: 0.57,
    shadowRadius: 5,

    elevation: 10,
  },
})

export default MySettingWithdrawalScreen
