import {View, Text, StyleSheet, Platform, TouchableOpacity} from "react-native"
import React from "react"
import BackButton from "../Button/BackButton"
import {SyeongColors} from "../Colors"
import {FastImageProps} from "react-native-fast-image"
import Image from "../Image/Image"

type HeaderProps = {
  backgroundColor: string
  padding?: number[]
  title: string
  icon?: {
    source: FastImageProps["source"]
    style: FastImageProps["style"]
    onPress: () => void
  }
}

const HaederWithTitle = (props: HeaderProps) => {
  const {backgroundColor, padding, title, icon} = props

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
      <View style={styles.backButton}>
        <BackButton />
      </View>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{title}</Text>
      </View>

            <View style={styles.icon}>
      <TouchableOpacity onPress={icon?.onPress}>
        <Image source={icon?.source} style={icon?.style} />
      </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 36,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  backButton: {
    position: "absolute",
    top: 12,
    left: 20,
    zIndex: 10,
  },
  title: {
    color: SyeongColors.gray_8,
    fontSize: 17,
    lineHeight: 20.29,
    letterSpacing: -0.41,
    fontWeight: "600",
  },
  titleRow: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },
  icon: {
        position: "absolute",
    top: 12,
    right: 20,
    zIndex: 10,
  }
})

export default HaederWithTitle
