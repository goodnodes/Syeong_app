import React from 'react'
import FastImage, {FastImageProps} from 'react-native-fast-image'

type Props = {
  source: FastImageProps['source']
  style: FastImageProps['style']
}

const Image = (props: Props) => {
  return <FastImage source={props.source} style={props.style} />
}

export default Image
