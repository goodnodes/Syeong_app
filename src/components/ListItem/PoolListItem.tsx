import {View, Text, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import {SyeongColors} from '../Colors'
import Image from '../Image/Image'
import {useNavigation} from '@react-navigation/native'
import { pin_icon_gray1, pin_icon_gray3 } from '../../../assets/icons'

export type PoolData = {
  title: string
  region: string
  picture: string
}
type Props = {
  data: PoolData
}
const PoolListItem = (props: Props) => {
  const {title, region, picture} = props.data
  const navigation = useNavigation()
  const [isPinned, setIsPinned] = useState<boolean>(false)
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('SearchDetailScreen')
      }}>
      <View
        style={{
          width: '100%',
          height: 234,
          backgroundColor: SyeongColors.gray_1,
          marginBottom: 10,
          borderRadius: 10,
          shadowColor: '#8B95A199',
          shadowOffset: {
            width: 0,
            height: 11,
          },
          shadowOpacity: 0.57,
          shadowRadius: 15.19,

          elevation: 23,
        }}>
          <TouchableOpacity style={{position: 'absolute', top: 16, right: 16, zIndex: 10}}>

          <Image source={isPinned? pin_icon_gray1:pin_icon_gray3} style={{width: 24, height: 24}}/>
          </TouchableOpacity>
        <Image
          source={{uri: picture}}
          style={{
            width: '100%',
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
              fontWeight: '700',
              lineHeight: 19.09,
              letterSpacing: -0.41,
              marginBottom: 8,
            }}>
            {title}
          </Text>
          <Text
            style={{
              color: SyeongColors.gray_4,
              fontSize: 15,
              fontWeight: '500',
              lineHeight: 22,
              letterSpacing: -0.41,
            }}>
            {region}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default PoolListItem
