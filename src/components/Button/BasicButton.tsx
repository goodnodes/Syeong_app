import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import React from 'react'
import {SyeongColors} from '../Colors'

type BasicButtonProps = {
  text: string
  backgroundColor: string
  textColor: string
  borderColor?: string
  fullWidth?: boolean
  width?: number
  height?: number
  textSize?: number
  margin?: number[]
  disabled?: boolean
  borderRadius?: number
  borderWidth?:number
  onPress: () => void
}

const BasicButton = (props: BasicButtonProps) => {
  const {
    text,
    backgroundColor,
    textColor,
    borderColor,
    fullWidth,
    width,
    height,
    textSize,
    margin,
    disabled,
    borderRadius,
    borderWidth,
    onPress,
  } = props
  return (
    <TouchableOpacity
      disabled={disabled ? disabled : false}
      onPress={onPress}
      style={[
        styles.button,
        {backgroundColor: backgroundColor},
        borderColor
          ? {borderColor: borderColor}
          : {borderColor: backgroundColor},
        width ? {width: width} : null,
        height ? {height: height} : null,
        fullWidth ? {width: '100%'} : null,
        margin
          ? {
              marginTop: margin[0],
              marginRight: margin[1],
              marginBottom: margin[2],
              marginLeft: margin[3],
            }
          : null,
        borderRadius ? {borderRadius: borderRadius} : null,
        borderWidth ? {borderWidth: borderWidth} : null,
      ]}>
      <View>
        <Text
          style={[
            styles.text,
            {color: textColor},
            textSize ? {fontSize: textSize} : null,
            disabled ? {color: SyeongColors.sub_OFF_1} : null,
          ]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 300,
    height: 62,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  text: {
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 20.29,
    letterSpacing: -0.41,
  },
})

export default BasicButton
