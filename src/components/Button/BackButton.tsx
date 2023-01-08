import {useNavigation} from '@react-navigation/native'
import React from 'react'
import {Image, TouchableOpacity} from 'react-native'
import {caret_left_icon, caret_left_icon_white} from '../../../assets/icons'
type Props = {
  isLight?: boolean
}
const BackButton = (props: Props) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack()
      }}>
      <Image
        source={props.isLight ? caret_left_icon_white : caret_left_icon}
        style={{width: 24, height: 24}}
      />
    </TouchableOpacity>
  )
}

export default BackButton
