import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import React, {useState} from 'react'
import Modal from 'react-native-modal'
import {SyeongColors} from '../../../components/Colors'
import Image from '../../../components/Image/Image'
import {map_icon_main3, restart_icon} from '../../../../assets/icons'
import {regionData} from '../../../../assets/static/region'
import BasicButton from '../../../components/Button/BasicButton'

type Props = {
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
  selectedRegion: string[]
  setSelectedRegion: React.Dispatch<React.SetStateAction<string[]>>
}

const RegionModal = (props: Props) => {
  const {isVisible, setIsVisible, selectedRegion, setSelectedRegion} = props

  const [tempSelectedRegion, setTempSelectedRegion] =
    useState<string[]>(selectedRegion)
  const onPressRegionButton = (region: string) => {
    if (selectedRegion.includes(region)) {
      setTempSelectedRegion(tempSelectedRegion.filter(item => item !== region))
    } else {
      setTempSelectedRegion([...tempSelectedRegion, region])
    }
  }
  const onPressRefreshButton = () => {
    setTempSelectedRegion([])
  }
  const onPressFinishSelect = () => {
    setSelectedRegion(tempSelectedRegion)
    setIsVisible(false)
  }
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => {
        setTempSelectedRegion(selectedRegion)
        setIsVisible(false)
      }}
      onBackButtonPress={() => {
        setTempSelectedRegion(selectedRegion)
        setIsVisible(false)
      }}
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}
      backdropColor={'#74747480'}
      style={styles.fullScreen}>
      <View style={styles.modalView}>
        <View style={styles.titleRow}>
          <View style={styles.rowAlignCenter}>
            <Image source={map_icon_main3} style={styles.map_icon_main3} />
            <Text style={styles.title}>지역 설정</Text>
          </View>
          <TouchableOpacity onPress={onPressRefreshButton}>
            <View style={styles.rowAlignCenter}>
              <Image source={restart_icon} style={styles.restart_icon} />
              <Text style={styles.subText}>초기화</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.regionButtonsArea}>
          {regionData.map((region, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  onPressRegionButton(region)
                }}>
                <View
                  style={[
                    styles.regionButton,
                    tempSelectedRegion.includes(region) &&
                      styles.selectedRegionButton,
                  ]}>
                  <Text
                    style={[
                      styles.regionButtonText,
                      tempSelectedRegion.includes(region) &&
                        styles.selectedRegionButtonText,
                    ]}>
                    {region}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </View>
        <BasicButton
          text="적용하기"
          backgroundColor={SyeongColors.main_3}
          textColor={SyeongColors.gray_1}
          fullWidth
          height={44}
          borderRadius={8}
          onPress={onPressFinishSelect}
        />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  fullScreen: {justifyContent: 'center', alignItems: 'center'},
  modalView: {
    backgroundColor: SyeongColors.gray_1,
    width: 318,
    borderRadius: 15,
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 11,
  },
  map_icon_main3: {
    width: 24,
    height: 24,
    marginRight: 4,
  },
  title: {
    color: SyeongColors.gray_8,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 19.09,
    letterSpacing: -0.41,
  },
  rowAlignCenter: {flexDirection: 'row', alignItems: 'center'},
  restart_icon: {
    width: 18,
    height: 18,
    marginRight: 4,
  },
  subText: {
    color: SyeongColors.gray_4,
    fontSize: 14,
    lineHeight: 16.71,
    letterSpacing: -0.41,
    fontWeight: '500',
  },
  regionButtonsArea: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 14,
  },
  regionButton: {
    height: 32,
    backgroundColor: SyeongColors.gray_1,
    borderWidth: 1,
    borderColor: SyeongColors.gray_2,
    borderRadius: 8,
    marginRight: 6,
    marginVertical: 4,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8B95A199',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 17,
  },
  selectedRegionButton: {
    backgroundColor: SyeongColors.main_4,
  },
  regionButtonText: {
    color: SyeongColors.gray_6,
    fontSize: 14,
    lineHeight: 32,
    fontWeight: '500',
  },
  selectedRegionButtonText: {
    color: SyeongColors.gray_1,
  },
})

export default RegionModal
