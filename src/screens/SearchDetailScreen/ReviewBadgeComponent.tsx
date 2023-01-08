import {View, Text, StyleSheet} from 'react-native'
import React from 'react'
import {SyeongColors} from '../../components/Colors'

type Props = {
  prize: number
  reviewNum: number
  content: string
}
const ReviewBadgeComponent = (props: Props) => {
  const {prize, reviewNum, content} = props
  return (
    <View
      style={{
        backgroundColor: SyeongColors.gray_1,
        height: 105,
        width: '100%',
        borderRadius: 8,
        paddingHorizontal: 16,
        marginVertical: 4,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 4,
        }}>
        <Text style={{lineHeight: 56, fontSize: 32}}>
          {prize === 1 ? '🥇' : '🥈'}
        </Text>
        <Text
          style={[
            {
              color: SyeongColors.gray_4,
              fontSize: 24,
              fontWeight: '600',
              lineHeight: 44,
            },
            prize === 2 && {color: SyeongColors.gray_3},
          ]}>
          {reviewNum}
        </Text>
      </View>
      <Text
        style={{
          color: SyeongColors.gray_8,
          fontSize: 16,
          fontWeight: '600',
          lineHeight: 32,
        }}>
        {`"${content}"`}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({})

export default ReviewBadgeComponent
