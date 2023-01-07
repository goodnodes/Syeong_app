import {View, Text, TextInput, StyleSheet, KeyboardType} from 'react-native'
import React from 'react'
import {SyeongColors} from '../Colors'

type Props = {
  value: string
  placeholder?: string
  maxLength?: number
  keyboardType?: KeyboardType
  margin?: number[]
  secureTextEntry?: boolean
  onChangeText: (text: string) => void
}

const BasicTextInput = (props: Props) => {
  const {value, placeholder, maxLength, keyboardType, margin,secureTextEntry, onChangeText} =
    props
  return (
    <TextInput
      value={value}
      placeholder={placeholder}
      placeholderTextColor={SyeongColors.gray_4}
      style={[
        styles.textInput,
        margin
          ? {
              marginTop: margin[0],
              marginRight: margin[1],
              marginBottom: margin[2],
              marginLeft: margin[3],
            }
          : null,
      ]}
      maxLength={maxLength}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      autoComplete='off'
      autoCorrect={false}
      autoCapitalize='none'
    />
  )
}
const styles = StyleSheet.create({
  textInput: {
    backgroundColor: SyeongColors.gray_2,
    width: '100%',
    height: 52,
    borderRadius: 8,
    fontSize: 16,
    lineHeight: 19.09,
    letterSpacing: -0.41,
    fontWeight: '500',
    paddingLeft: 16,
  },
})
export default BasicTextInput
