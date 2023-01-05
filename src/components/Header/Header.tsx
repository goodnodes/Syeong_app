import {View, Text, StyleSheet} from 'react-native'
import React from 'react'

type HeaderProps = {
  backgroundColor: string
  padding?: number[]
  children: React.ReactNode
}

const Header = (props: HeaderProps) => {
  const {backgroundColor, padding, children} = props
  return (
    <View
      style={[
        styles.header,
        {backgroundColor: backgroundColor},
        padding
          ? {
              paddingTop: padding[0],
              paddingRight: padding[1],
              paddingBottom: padding[2],
              paddingLeft: padding[3],
            }
          : null,
      ]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 31,
    paddingHorizontal: 20,
    paddingTop: 7,
  },
})

export default Header
