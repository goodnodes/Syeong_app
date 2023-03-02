import {useNavigation} from "@react-navigation/native"
import React, {useState} from "react"
import {Text, TouchableOpacity, View} from "react-native"
import {useRecoilState, useRecoilValue} from "recoil"
import {
  pin_icon_gray3_shadow,
  pin_icon_sub4_shadow,
  push_pin_simple_icon_sub3,
  traffic_cone_icon,
} from "../../../assets/icons"
import {blank_image} from "../../../assets/images"
import {authAtom, user} from "../../atoms/auth"
import {PoolType} from "../../atoms/pool"
import {useMyPoolAdd, useMyPoolDelete} from "../../hooks/useMyPool"
import {SyeongColors} from "../Colors"
import Image from "../Image/Image"
import DoubleModal from "../Modal/DoubleModal"
import SingleModal from "../Modal/SingleModal"

type Props = {
  data: PoolType
}
const PoolListItem = (props: Props) => {
  const navigation = useNavigation()
  const [userAtom, setUserAtom] = useRecoilState(user)
  const isLoggedIn = useRecoilValue(authAtom)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [isWarningModalVisible, setIsWarningModalVisible] =
    useState<boolean>(false)
    const [isLoginModalVisible, setIsLoginModalVisible] =
    useState<boolean>(false)

  const onPressPin = async () => {
    if(!isLoggedIn){
      setIsLoginModalVisible(true)
      return
    }
    try {
      if (userAtom.mypools?.includes(props.data._id)) {
        await useMyPoolDelete(props.data._id)
      } else {
        await useMyPoolAdd(props.data._id)
        setIsModalVisible(true)
      }
    } catch (err) {
      if (err === "myPool limit") {
        setIsWarningModalVisible(true)
      } else {
        console.log(err)
      }
    }
  }

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("SearchDetailScreen", {item: props.data})
      }}>
      <View
        style={{
          width: "100%",
          height: 234,
          backgroundColor: SyeongColors.gray_1,
          marginBottom: 10,
          borderRadius: 10,
          shadowColor: "#8B95A199",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.4,
          shadowRadius: 10,

          elevation: 8,
        }}>
        <TouchableOpacity
          style={{position: "absolute", top: 16, right: 16, zIndex: 10}}
          onPress={onPressPin}>
          <Image
            source={
              userAtom.mypools?.includes(props.data._id)
                ? pin_icon_sub4_shadow
                : pin_icon_gray3_shadow
            }
            style={{width: 24, height: 24}}
          />
        </TouchableOpacity>
        <Image
          source={
            props.data.imgurl || props.data.outsideimgurl
              ? {uri: props.data.imgurl || props.data.outsideimgurl}
              : blank_image
          }
          style={{
            width: "100%",
            height: 142,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        />
        <View style={{padding: 16}}>
          <Text
            style={{
              color: SyeongColors.gray_8,
              fontSize: 16,
              fontWeight: "700",
              lineHeight: 19.09,
              letterSpacing: -0.41,
              marginBottom: 8,
            }}>
            {props.data.name}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: SyeongColors.gray_4,
              fontSize: 15,
              fontWeight: "500",
              lineHeight: 22,
              letterSpacing: -0.41,
            }}>
            {props.data.address}
          </Text>
        </View>
      </View>
      <SingleModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        onPressButton={() => {
          setIsModalVisible(false)
        }}
        image={push_pin_simple_icon_sub3}
        mainText="나의 고정 수영장에 저장했어요!"
        subText={`고정 수영장은 최대 5개까지 설정할 수 있고 홈 화면,\n내 정보에서 확인할 수 있어요`}
        buttonText="확인"
      />
      <SingleModal
        isVisible={isWarningModalVisible}
        setIsVisible={setIsWarningModalVisible}
        onPressButton={() => {
          setIsWarningModalVisible(false)
        }}
        image={traffic_cone_icon}
        mainText="이미 고정 수영장 5개를 설정했어요!"
        subText={`고정 수영장은 최대 5개까지 설정할 수 있고 홈 화면,\n내 정보에서 확인할 수 있어요`}
        buttonText="확인"
      />
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
    </TouchableOpacity>
  )
}

export default PoolListItem
