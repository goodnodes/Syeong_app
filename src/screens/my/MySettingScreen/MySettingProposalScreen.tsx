import {Link} from "@react-navigation/native"
import React from "react"
import {Linking, StatusBar, StyleSheet, Text, View} from "react-native"
import {SafeAreaView} from "react-native-safe-area-context"
import BasicButton from "../../../components/Button/BasicButton"
import {SyeongColors} from "../../../components/Colors"
import HaederWithTitle from "../../../components/Header/HeaderWithTitle"
import SyeongStatusBar from "../../../components/Header/SyeongStatusBar"

const MySettingProposalScreen = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <SyeongStatusBar />
      <HaederWithTitle
        backgroundColor={SyeongColors.gray_1}
        title={"정보 수정 제안하기"}
      />
      <View
        style={{
          marginTop: 50,
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
        }}>
        <Text
          style={{
            color: SyeongColors.gray_7,
            fontSize: 15,
            fontWeight: "600",
            lineHeight: 17.9,
            letterSpacing: -0.41,
          }}>
          👍 정보 수정 제안
        </Text>
        <BasicButton
          text="구글폼 바로가기"
          backgroundColor={SyeongColors.sub_4}
          textSize={15}
          textColor={SyeongColors.gray_1}
          borderRadius={8}
          borderWidth={1}
          borderColor={SyeongColors.main_3}
          width={120}
          height={36}
          onPress={() => {
            Linking.openURL("https://forms.gle/6buRSbW2T6a647a26")
          }}
        />
      </View>

      <View
        style={{
          marginTop: 8,
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
        }}>
        <Text
          style={{
            color: SyeongColors.gray_7,
            fontSize: 15,
            fontWeight: "600",
            lineHeight: 17.9,
            letterSpacing: -0.41,
          }}>
          ☎️ 문의하기
        </Text>
        <BasicButton
          text="구글폼 바로가기"
          backgroundColor={SyeongColors.sub_4}
          textColor={SyeongColors.gray_1}
          textSize={15}
          borderRadius={8}
          borderWidth={1}
          borderColor={SyeongColors.main_3}
          width={120}
          height={36}
          onPress={() => {
            Linking.openURL("https://forms.gle/ne8ZtCVMUkn1Qj4fA")
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
})

export default MySettingProposalScreen
