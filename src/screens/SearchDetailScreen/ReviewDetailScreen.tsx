import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import React from 'react'
import Header from '../../components/Header/Header'
import BackButton from '../../components/Button/BackButton'
import {SyeongColors} from '../../components/Colors'
import ReviewBadgeComponent from './ReviewBadgeComponent'
import Image from '../../components/Image/Image'
import ReviewItem from './ReviewItem'
import {pencil_icon} from '../../../assets/icons'

const ReviewDetailScreen = ({navigation, route}) => {
  const {data} = route.params
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar barStyle={'dark-content'} />
      <Header backgroundColor="#FFFFFF">
        <View style={styles.backButton}>
          <BackButton />
        </View>
        <View style={styles.header}>
          <Text style={styles.title}>{data.title}</Text>
        </View>
      </Header>
      <View style={styles.reviewContainer}>
        <View style={styles.reviewTitleRow}>
          <View style={styles.rowAlignCenter}>
            <Text style={styles.reviewTitle}>수영장 리뷰 </Text>
            <Text style={styles.reviewNum}>12</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('WriteReviewScreen', {
                data: {title: data.title},
              })
            }}>
            <View style={styles.rowAlignCenter}>
              <Image source={pencil_icon} style={styles.pencil_icon} />
              <Text style={styles.plainText}>리뷰 작성하기</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={data.review}
        renderItem={({item, index}) => {
          return (
            <View
              style={[
                {
                  backgroundColor: SyeongColors.gray_1,
                  paddingHorizontal: 16,
                },
                index === 0 && {
                  borderTopRightRadius: 8,
                  borderTopLeftRadius: 8,
                },
                index === data.review.length - 1 && {
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                },
              ]}>
              <ReviewItem review={item} />
            </View>
          )
        }}
        contentContainerStyle={{paddingBottom: 20, paddingHorizontal: 20}}
        ListHeaderComponent={
          <View style={{marginBottom: 4}}>
            <ReviewBadgeComponent
              prize={1}
              reviewNum={10}
              content={'청결한 샤워실'}
            />
            <ReviewBadgeComponent
              prize={2}
              reviewNum={8}
              content={'깨끗한 물'}
            />
          </View>
        }
      />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    position: 'absolute',
    top: 7,
    left: 20,
    zIndex: 10,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: SyeongColors.gray_8,
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 20.29,
    letterSpacing: -0.41,
  },
  reviewContainer: {marginBottom: 24, paddingHorizontal: 20, marginTop: 48},
  reviewTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewTitle: {
    color: SyeongColors.gray_8,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 19.09,
    letterSpacing: -0.41,
  },
  reviewNum: {
    color: SyeongColors.gray_6,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 19.09,
    letterSpacing: -0.41,
  },
  pencil_icon: {width: 20, height: 20, marginRight: 4},
  plainText: {
    color: SyeongColors.gray_6,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: -0.41,
  },
  reviewList: {
    backgroundColor: SyeongColors.gray_1,
    borderRadius: 8,
    // paddingHorizontal: 16,
    marginTop: 4,
  },
  rowAlignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default ReviewDetailScreen
