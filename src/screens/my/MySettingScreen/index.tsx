import React, {useState} from "react"
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import {SafeAreaView} from "react-native-safe-area-context"
import {chevron_right, traffic_cone_icon} from "../../../../assets/icons"
import BackButton from "../../../components/Button/BackButton"
import {SyeongColors} from "../../../components/Colors"
import Header from "../../../components/Header/Header"
import DoubleModal from "../../../components/Modal/DoubleModal"

const MySettingScreen = ({navigation}) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const signOut = () => {}
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Header backgroundColor={SyeongColors.gray_1}>
        <BackButton />
      </Header>
      <ScrollView style={styles.scrollView}>
        <View style={styles.component}>
          <Text style={styles.componentTitle}>계정</Text>
          <TouchableOpacity>
            <View style={styles.button}>
              <Text style={styles.buttonText}>휴대폰</Text>
              <Text style={styles.buttonSubText}>010-2345-3455</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.component}>
          <Text style={styles.componentTitle}>소통해요</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("MySettingProposalScreen")
            }}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>정보 수정 제안하기</Text>
              <Image source={chevron_right} style={styles.chevron_right} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.component}>
          <Text style={styles.componentTitle}>약관 및 정책</Text>
          <TouchableOpacity>
            <View style={[styles.button, {marginBottom: 8}]}>
              <Text style={styles.buttonText}>이용약관</Text>
              <Image source={chevron_right} style={styles.chevron_right} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.button}>
              <Text style={styles.buttonText}>개인정보 처리방침</Text>
              <Image source={chevron_right} style={styles.chevron_right} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.component}>
          <Text style={styles.componentTitle}>계정 관리</Text>
          <TouchableOpacity
            onPress={() => {
              setIsModalVisible(true)
            }}>
            <View style={[styles.button, {marginBottom: 8}]}>
              <Text style={styles.buttonText}>로그아웃</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={[styles.button, {marginBottom: 8}]}>
              <Text style={styles.buttonText}>비밀번호 변경하기</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("MySettingWithdrawalScreen")
            }}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>계정 탈퇴하기</Text>
              <Image source={chevron_right} style={styles.chevron_right} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <DoubleModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        image={traffic_cone_icon}
        mainText="로그아웃할까요?"
        subText={`계정에서 로그아웃할게요${"\n"}휴대폰 번호를 통해 다시 로그인할 수 있어요`}
        leftButtonText="아니요"
        rightButtonText="로그아웃"
        onPressLeftButton={() => {
          setIsModalVisible(false)
        }}
        onPressRightButton={signOut}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: SyeongColors.gray_1,
  },
  scrollView: {
    flex: 1,
    marginTop: 7,
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  button: {
    flexDirection: "row",
    height: 52,
    width: "100%",
    backgroundColor: SyeongColors.gray_2,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
  },
  component: {
    marginVertical: 16,
  },
  componentTitle: {
    color: SyeongColors.gray_8,
    fontWeight: "600",
    fontSize: 17,
    lineHeight: 20.29,
    letterSpacing: -0.41,
    marginBottom: 16,
  },
  buttonText: {
    color: SyeongColors.gray_8,
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 19.09,
    letterSpacing: -0.41,
  },
  buttonSubText: {
    color: SyeongColors.gray_5,
    fontWeight: "500",
    fontSize: 15,
    lineHeight: 17.9,
    letterSpacing: -0.41,
  },
  chevron_right: {
    width: 24,
    height: 24,
  },
})

export default MySettingScreen
