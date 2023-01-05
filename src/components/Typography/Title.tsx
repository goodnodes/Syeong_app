import React from 'react'
import {Text} from 'react-native'
import {SyeongColors} from '../Colors'

type Props = {
  text: string
  margin?: number[]
}

const Title = (props: Props) => {
  const {text, margin} = props
  return (
    <Text
      style={[
        {
          color: SyeongColors.gray_8,
          fontSize: 20,
          fontWeight: '600',
          lineHeight: 28,
          letterSpacing: -0.41,
        },
        margin
          ? {
              marginTop: margin[0],
              marginRight: margin[1],
              marginBottom: margin[2],
              marginLeft: margin[3],
            }
          : null,
      ]}>
      {text}
    </Text>
  )
}

export default Title
