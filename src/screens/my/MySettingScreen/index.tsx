import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native'
import React, {useState} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import Modal from 'react-native-modal'
import Header from '../../../components/Header/Header'
import BackButton from '../../../components/Button/BackButton'
import {SyeongColors} from '../../../components/Colors'
import {
  chevron_right,
  pencil_icon_sub3,
  traffic_cone_icon,
} from '../../../../assets/icons'
import BasicButton from '../../../components/Button/BasicButton'

const MySettingScreen = ({navigation}) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>()
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
              navigation.navigate('MySettingProposalScreen')
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
              navigation.navigate('MySettingWithdrawalScreen')
            }}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>계정 탈퇴하기</Text>
              <Image source={chevron_right} style={styles.chevron_right} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        animationIn={'zoomIn'}
        animationOut={'zoomOut'}
        isVisible={isModalVisible}
        onBackButtonPress={() => {
          setIsModalVisible(false)
        }}
        onBackdropPress={() => {
          setIsModalVisible(false)
        }}
        style={{justifyContent: 'center', alignItems: 'center'}}
        backdropColor="#74747480">
        <View
          style={{
            backgroundColor: SyeongColors.gray_1,
            borderRadius: 15,
            paddingHorizontal: 16,
            alignItems: 'center',
          }}>
          <Image
            source={traffic_cone_icon}
            style={{width: 60, height: 60, marginTop: 27, marginBottom: 16}}
          />
          <Text
            style={{
              color: SyeongColors.gray_8,
              fontSize: 16,
              fontWeight: '600',
              lineHeight: 19.09,
              letterSpacing: -0.41,
              marginBottom: 8,
            }}>
            로그아웃할까요?
          </Text>
          <Text
            style={{
              color: SyeongColors.gray_4,
              fontSize: 14,
              fontWeight: '500',
              lineHeight: 19.6,
              letterSpacing: -0.41,
              textAlign: 'center',
              marginBottom: 36,
            }}>
            계정에서 로그아웃할게요{'\n'}휴대폰 번호를 통해 다시 로그인할 수
            있어요
          </Text>
          <View style={{flexDirection: 'row', marginBottom: 16}}>
            <BasicButton
              width={136}
              height={44}
              text="아니요"
              backgroundColor={SyeongColors.gray_3}
              textColor={SyeongColors.gray_5}
              textSize={17}
              margin={[0, 15, 0, 0]}
              borderRadius={8}
              onPress={() => {
                setIsModalVisible(false)
              }}
            />
            <BasicButton
              width={136}
              height={44}
              text="로그아웃"
              backgroundColor={SyeongColors.main_3}
              textColor={SyeongColors.gray_1}
              textSize={17}
              borderRadius={8}
              onPress={() => {}}
            />
          </View>
        </View>
      </Modal>
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
    flexDirection: 'row',
    height: 52,
    width: '100%',
    backgroundColor: SyeongColors.gray_2,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },
  component: {
    marginVertical: 16,
  },
  componentTitle: {
    color: SyeongColors.gray_8,
    fontWeight: '600',
    fontSize: 17,
    lineHeight: 20.29,
    letterSpacing: -0.41,
    marginBottom: 16,
  },
  buttonText: {
    color: SyeongColors.gray_8,
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19.09,
    letterSpacing: -0.41,
  },
  buttonSubText: {
    color: SyeongColors.gray_5,
    fontWeight: '500',
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
