import React from 'react'
import { StyleSheet, View } from 'react-native'

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
    height: 36,
    paddingHorizontal: 20,
    paddingTop: 13.5,
  },
})

export default Header
