import React from 'react'
import { StatusBarProps, StatusBar, Platform} from 'react-native'


const SyeongStatusBar = (props: StatusBarProps) => {
  return (
    <StatusBar barStyle={props.barStyle || Platform.OS === 'ios'?'dark-content':'light-content'} />
  )
}

export default SyeongStatusBar