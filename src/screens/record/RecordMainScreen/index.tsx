import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native"
import React, { useState } from "react"
import {SafeAreaView} from "react-native-safe-area-context"
import {SyeongColors} from "../../../components/Colors"
import Header from "../../../components/Header/Header"
import {fire_icon, search_icon_white, traffic_cone_icon, user_icon} from "../../../../assets/icons"
import SyeongStatusBar from "../../../components/Header/SyeongStatusBar"
import DoubleModal from "../../../components/Modal/DoubleModal"
import { useRecoilState } from "recoil"
import { authAtom } from "../../../atoms/auth"

const RecordMainScreen = ({navigation}) => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(authAtom)
  const [isLoginModalVisible, setIsLoginModalVisible] = useState<boolean>(false)
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <SyeongStatusBar />
      <Header backgroundColor={SyeongColors.gray_1}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SearchMainScreen")
            }}>
            <Image
              source={search_icon_white}
              style={{width: 24, height: 24, tintColor: SyeongColors.gray_8}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (!isLoggedIn) {
                setIsLoginModalVisible(true)
              } else {
                setIsLoginModalVisible(false)
                navigation.navigate("MyMainScreen")
              }
            }}>
            <Image
              source={user_icon}
              style={{width: 24, height: 24, tintColor: SyeongColors.gray_8}}
            />
          </TouchableOpacity>
        </View>
      </Header>
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Image
          source={fire_icon}
          style={{width: 80, height: 80, marginBottom: 36}}
        />
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            lineHeight: 21.48,
            letterSpacing: -0.41,
            color: SyeongColors.gray_8,
            marginBottom: 12,
          }}>
          지금 준비중!
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            lineHeight: 22.4,
            letterSpacing: -0.41,
            color: SyeongColors.gray_4,
            textAlign: "center",
          }}>
          나의 수영 기록을 한눈에 보고 아카이빙 할 수 있어요
        </Text>
      </View>
            <DoubleModal
        isVisible={isLoginModalVisible}
        setIsVisible={setIsLoginModalVisible}
        image={traffic_cone_icon}
        mainText={"로그인이 필요한 서비스입니다."}
        subText={
          `로그인을 하면 리뷰, 자주 가는 수영장 고정 등\n더 많은 서비스를 이용할 수 있어요.`
        }
        leftButtonText={"아니요"}
        onPressLeftButton={() => {
          setIsLoginModalVisible(false)
        }}
        rightButtonText={"간편 로그인하기"}
        onPressRightButton={() => {
          setIsLoginModalVisible(false)
          navigation.navigate("LandingScreen")
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: SyeongColors.gray_1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
})

export default RecordMainScreen
