import {useNavigation} from "@react-navigation/native"
import React, {useState} from "react"
import {Text, TouchableOpacity, View} from "react-native"
import {useRecoilState} from "recoil"
import {
  pin_icon_gray1,
  pin_icon_gray3,
  pin_icon_gray3_shadow,
  pin_icon_shadow,
  pin_icon_sub4_shadow,
  push_pin_simple_icon_sub3,
} from "../../../assets/icons"
import {user} from "../../atoms/auth"
import {PoolType} from "../../atoms/pool"
import {useMyPoolAdd, useMyPoolDelete} from "../../hooks/useMyPool"
import {SyeongColors} from "../Colors"
import Image from "../Image/Image"
import SingleModal from "../Modal/SingleModal"

type Props = {
  data: PoolType
}
const PoolListItem = (props: Props) => {
  const navigation = useNavigation()
  const [userAtom, setUserAtom] = useRecoilState(user)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  const onPressPin = async () => {
    try {
      if (userAtom.mypools?.includes(props.data._id)) {
        await useMyPoolDelete(props.data._id)
      } else {
        await useMyPoolAdd(props.data._id)
        setIsModalVisible(true)
      }
    } catch (err) {
      console.log(err)
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
            height: 6,
          },
          shadowOpacity: 0.57,
          shadowRadius: 5,

          elevation: 10,
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
          source={{uri: props.data.imgurl}}
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
        subText="고정 수영장은 최대 5개까지 설정할 수 있고 홈 화면, 내 정보에서 확인할 수 있어요"
        buttonText="확인"
      />
    </TouchableOpacity>
  )
}

export default PoolListItem
