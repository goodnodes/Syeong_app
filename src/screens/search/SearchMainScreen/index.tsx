import {debounce} from "lodash"
import React, {useEffect, useRef, useState} from "react"
import {
  FlatList,
  Keyboard,
  ListRenderItem,
  SafeAreaView,
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
  arrow_line_up_icon,
  map_icon_main3,
  search_icon_gray4,
  search_icon_gray8,
} from "../../../../assets/icons"
import {pool, PoolType} from "../../../atoms/pool"
import {SyeongColors} from "../../../components/Colors"
import Image from "../../../components/Image/Image"
import PoolListItem from "../../../components/ListItem/PoolListItem"
import RegionModal from "./RegionModal"

const SearchMainScreen = ({navigation}) => {
  const insets = useSafeAreaInsets()

  const poolData = useRecoilValue(pool)
  const [searchText, setSearchText] = useState<string>("")
  const [searchRecommends, setSearchRecoomends] = useState<PoolType[]>([])
  const [isRecommendsVisible, setIsRecommendsVisible] = useState<boolean>(false)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [selectedRegion, setSelectedRegion] = useState<string[]>([])
  const [poolList, setPoolList] = useState<PoolType[]>(poolData)

  const keywordRef = useRef<string>("")
  const flatListRef = useRef<FlatList>()

  useEffect(() => {
    getFilteredPoolData()
  }, [selectedRegion])

  useEffect(() => {
    if (!searchText.length) {
      setSearchRecoomends([])
      setIsRecommendsVisible(false)
      return
    }
    const filtered = poolData.filter(
      el => el.address.includes(searchText) || el.name.includes(searchText),
    )
    if (!filtered.length) {
      setSearchRecoomends([])
      setIsRecommendsVisible(false)
      return
    }
    setSearchRecoomends(filtered)
    setIsRecommendsVisible(true)
  }, [searchText])

  const getFilteredPoolData = () => {
    if (!selectedRegion.length) {
      setPoolList(
        poolData.filter(el => {
          return (
            el.address.includes(keywordRef.current) ||
            el.name.includes(keywordRef.current)
          )
        }),
      )
      return
    }
    setPoolList(
      poolData.filter(el => {
        return (
          selectedRegion.includes(el.region) &&
          (el.address.includes(keywordRef.current) ||
            el.name.includes(keywordRef.current))
        )
      }),
    )
  }

  const debounceSearch = debounce(() => {
    getFilteredPoolData()
  }, 2500)

  const renderFlatListItem: ListRenderItem<PoolType> = ({item}) => {
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

  const renderRecommendsItem: ListRenderItem<PoolType> = ({
    item,
  }: {
    item: PoolType
  }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SearchDetailScreen", {
            item: item,
          })
        }}>
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
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  const renderRecommends = () => {
    return (
      <View style={[styles.recommendsView, {top: insets.top + 65}]}>
        <View style={styles.recommendsContainer}>
          <FlatList data={searchRecommends} renderItem={renderRecommendsItem} />
        </View>
      </View>
    )
  }

  const renderSearchBar = () => {
    return (
      <View style={styles.searchContainer}>
        <Image source={search_icon_gray8} style={styles.search_icon_gray8} />
        <TextInput
          value={searchText}
          onChangeText={text => {
            setSearchText(text)
            keywordRef.current = text
            return debounceSearch()
          }}
          style={styles.searchTextInput}
          placeholder="수영장 이름, 특정 지역 검색"
          placeholderTextColor={SyeongColors.gray_4}
          autoComplete="off"
          autoCorrect={false}
          autoCapitalize="none"
          onSubmitEditing={() => {
            getFilteredPoolData()
            setIsRecommendsVisible(false)
          }}
        />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar barStyle={"dark-content"} />
      {isRecommendsVisible && renderRecommends()}
      {renderSearchBar()}
      <View style={styles.listArea}>
        <View style={styles.listHeader}>
          <Text style={styles.listHeaderTitle}>
            {poolList.length === poolData.length
              ? "모든 수영장"
              : `검색 결과 ${poolList.length}`}
          </Text>
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
          onMomentumScrollBegin={() => {
            if (!isRecommendsVisible) return
            setIsRecommendsVisible(false)
            Keyboard.dismiss()
          }}
          ref={flatListRef}
          data={poolList}
          renderItem={renderFlatListItem}
          contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 30}}
        />
        <TouchableOpacity
          onPress={() => {
            flatListRef.current?.scrollToIndex({index: 0, animated: true})
          }}>
          <View
            style={{
              backgroundColor: SyeongColors.gray_2,
              width: 60,
              height: 60,
              borderRadius: 999,
              position: "absolute",
              right: 20,
              bottom: 50,
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#8B95A199",
              shadowOffset: {
                width: 0,
                height: 6,
              },
              shadowOpacity: 0.57,
              shadowRadius: 5,

              elevation: 10,
            }}>
            <Image
              source={arrow_line_up_icon}
              style={{width: 28, height: 28}}
            />
          </View>
        </TouchableOpacity>
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
    marginTop: 12,
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
    flexShrink: 1,
    width: "100%",
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
      height: 6,
    },
    shadowOpacity: 0.57,
    shadowRadius: 5,

    elevation: 10,
  },
  map_icon_main3: {
    width: 18,
    height: 18,
    marginRight: 4,
  },
  recommendsView: {
    position: "absolute",
    left: 0,
    zIndex: 100,
    width: "100%",
    paddingHorizontal: 20,
  },
  recommendsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: SyeongColors.gray_1,
    maxHeight: 300,
    borderRadius: 10,

    shadowColor: "#8B95A199",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.57,
    shadowRadius: 5,

    elevation: 10,
  },
})

export default SearchMainScreen
