import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { caret_left_icon } from '../../../assets/icons'

const BackButton = () => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.pop()
      }}>
      <Image source={caret_left_icon} style={{width: 24, height: 24}} />
    </TouchableOpacity>
  )
}

export default BackButton
