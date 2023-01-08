import {View, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import {SyeongColors} from '../Colors'
import Image from '../Image/Image'
import {useNavigation} from '@react-navigation/native'

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
          shadowColor: '#C5CCD399',
          shadowOffset: {
            width: 0,
            height: 11,
          },
          shadowOpacity: 0.57,
          shadowRadius: 15.19,

          elevation: 23,
        }}>
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
