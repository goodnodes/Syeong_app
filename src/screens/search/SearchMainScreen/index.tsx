import React, {useState} from "react"
import {
  FlatList,
  ListRenderItem,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import {useSafeAreaInsets} from "react-native-safe-area-context"
import {useRecoilValue} from "recoil"
import {
  map_icon_main3,
  search_icon_gray4,
  search_icon_gray8,
} from "../../../../assets/icons"
import {poolAtom} from "../../../atoms/pool"
import {SyeongColors} from "../../../components/Colors"
import Image from "../../../components/Image/Image"
import PoolListItem, {PoolData} from "../../../components/ListItem/PoolListItem"
import RegionModal from "./RegionModal"

const SearchMainScreen = () => {
  const insets = useSafeAreaInsets()

  const poolData = useRecoilValue(poolAtom)
  const [searchText, setSearchText] = useState<string>("")
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [selectedRegion, setSelectedRegion] = useState<string[]>([])
  const [poolList, setPoolList] = useState<PoolData[]>(poolData)
  const renderFlatListItem: ListRenderItem<PoolData> = ({item}) => {
    return <PoolListItem data={item} />
  }
  const renderRegionSelectButtonText = () => {
    if (!selectedRegion.length) {
      return "서울 전체"
    } else if (selectedRegion.length === 1) {
      return selectedRegion[0]
    } else {
      return `${selectedRegion[0]} +${selectedRegion.length - 1}`
    }
  }
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar barStyle={"dark-content"} />
      {searchText.length > 0 && (
        <View
          style={{
            position: "absolute",
            top: insets.top + 60,
            left: 0,
            zIndex: 100,
            width: "100%",
            paddingHorizontal: 16,
          }}>
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 10,
              backgroundColor: SyeongColors.gray_1,
              height: 300,
              borderRadius: 10,

              shadowColor: "#8B95A199",
              shadowOffset: {
                width: 0,
                height: 8,
              },
              shadowOpacity: 0.46,
              shadowRadius: 11.14,

              elevation: 17,
            }}>
            <FlatList
              data={["문정교육회관", "문정교육회관"]}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity>
                    <View
                      style={{
                        flexDirection: "row",
                        marginVertical: 6,
                        alignItems: "center",
                      }}>
                      <Image
                        source={search_icon_gray4}
                        style={{width: 24, height: 24, marginRight: 16}}
                      />
                      <Text
                        style={{
                          color: SyeongColors.gray_6,
                          fontSize: 16,
                          fontWeight: "400",
                          lineHeight: 19.09,
                          letterSpacing: -0.41,
                        }}>
                        {item}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )
              }}
            />
          </View>
        </View>
      )}

      <View style={styles.searchContainer}>
        <Image source={search_icon_gray8} style={styles.search_icon_gray8} />
        <TextInput
          value={searchText}
          onChangeText={text => {
            setSearchText(text)
          }}
          style={styles.searchTextInput}
          placeholder="수영장 이름, 특정 지역 검색"
          placeholderTextColor={SyeongColors.gray_4}
          autoComplete="off"
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.listArea}>
        <View style={styles.listHeader}>
          <Text style={styles.listHeaderTitle}>모든 수영장</Text>
          <TouchableOpacity
            onPress={() => {
              setIsModalVisible(true)
            }}>
            <View style={styles.regionSelectButton}>
              <Image source={map_icon_main3} style={styles.map_icon_main3} />
              <Text>{renderRegionSelectButtonText()}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <FlatList
          data={poolList}
          renderItem={renderFlatListItem}
          contentContainerStyle={{paddingHorizontal: 20}}
        />
      </View>
      <RegionModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: SyeongColors.gray_1,
  },
  searchContainer: {
    marginTop: 7,
    marginHorizontal: 20,
    height: 43,
    flexDirection: "row",
    backgroundColor: SyeongColors.gray_2,
    alignItems: "center",
    borderRadius: 15,
    paddingLeft: 16,
    marginBottom: 36,
  },
  search_icon_gray8: {
    width: 24,
    height: 24,
    tintColor: SyeongColors.gray_8,
    marginRight: 8,
  },
  searchTextInput: {
    color: SyeongColors.gray_8,
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 19.09,
    letterSpacing: -0.41,
  },
  listArea: {flex: 1},
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 11,
    paddingHorizontal: 20,
  },
  listHeaderTitle: {
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 20.29,
    letterSpacing: -0.41,
    color: SyeongColors.gray_8,
  },
  regionSelectButton: {
    flexDirection: "row",
    alignItems: "center",
    height: 30,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: SyeongColors.gray_1,
    borderWidth: 1,
    borderColor: SyeongColors.gray_2,
    borderRadius: 8,
    shadowColor: "#8B95A199",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 17,
  },
  map_icon_main3: {
    width: 18,
    height: 18,
    marginRight: 4,
  },
})

export default SearchMainScreen
