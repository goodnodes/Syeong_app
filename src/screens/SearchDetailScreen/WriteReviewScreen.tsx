import React, {useState} from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import Modal from 'react-native-modal'
import {pencil_icon_sub3, x_icon} from '../../../assets/icons'
import BasicButton from '../../components/Button/BasicButton'
import {SyeongColors} from '../../components/Colors'
import Header from '../../components/Header/Header'
import Image from '../../components/Image/Image'

const WriteReviewScreen = ({navigation, route}) => {
  const {data} = route.params

  const reviewTagsData = {
    clean: ['깨끗한 물', '청결한 샤워실'],
    service: ['편리한 센터 이용', '충분한 레인', '적당한 물 온도'],
    price: ['합리적인 가격'],
    access: ['편리한 대중 교통 이용', '넓은 주차공간', '다양한 주변 맛집'],
    etc: ['눈부신 채광', '오리발 사용 가능', '개인 기구 사용 가능'],
  }
  const [reviewText, setReviewText] = useState<string>('')
  const [reviewTags, setReviewTags] = useState<string[]>([])
  const [isModalVisible, setIsModalVisible] = useState<boolean>()

  const renderCategoryTitle = (category: string) => {
    switch (category) {
      case 'clean':
        return '청결'
      case 'service':
        return '서비스'
      case 'price':
        return '가격'
      case 'access':
        return '접근성'
      case 'etc':
        return '기타'
    }
  }
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar barStyle={'dark-content'} />
      <Header backgroundColor="#FFFFFF">
        <View style={styles.backButton}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack()
            }}>
            <Image source={x_icon} style={{width: 24, height: 24}} />
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <Text style={styles.title}>{data.title}</Text>
        </View>
      </Header>
      <ScrollView>
        <View style={styles.titleRow}>
          <Text
            style={{
              color: SyeongColors.gray_8,
              fontSize: 17,
              fontWeight: '600',
              lineHeight: 20.29,
              letterSpacing: -0.41,
              marginBottom: 4,
            }}>
            키워드 리뷰
          </Text>
          <Text
            style={{
              color: SyeongColors.gray_4,
              fontSize: 16,
              fontWeight: '500',
              lineHeight: 19.09,
              letterSpacing: -0.41,
            }}>
            수영장 키워드 최대 5개 선택 가능해요
          </Text>
        </View>
        <View>
          <ScrollView
            horizontal
            contentContainerStyle={{paddingLeft: 20, paddingBottom: 10}}
            indicatorStyle={'white'}>
            {Object.keys(reviewTagsData).map((category, keyIndex) => {
              return (
                <View key={keyIndex}>
                  <Text style={styles.categoryTitle}>
                    {renderCategoryTitle(category)}
                  </Text>
                  {reviewTagsData[category].map((tag, tagIndex) => {
                    return (
                      <TouchableOpacity
                        key={tagIndex}
                        onPress={() => {
                          if (reviewTags.includes(tag)) {
                            setReviewTags(
                              reviewTags.filter(item => item !== tag),
                            )
                          } else {
                            setReviewTags([...reviewTags, tag])
                          }
                        }}>
                        <View
                          style={[
                            styles.tagButton,
                            reviewTags.includes(tag) && {
                              backgroundColor: SyeongColors.main_4,
                            },
                          ]}>
                          <Text
                            style={[
                              styles.tagButtonText,
                              reviewTags.includes(tag) && {
                                color: SyeongColors.gray_1,
                              },
                            ]}>
                            {tag}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )
                  })}
                </View>
              )
            })}
          </ScrollView>
        </View>
        <View style={{marginTop: 50, paddingHorizontal: 20}}>
          <Text
            style={{
              color: SyeongColors.gray_8,
              fontSize: 17,
              fontWeight: '600',
              lineHeight: 20.29,
              letterSpacing: -0.41,
              marginBottom: 16,
            }}>
            작성 리뷰
          </Text>
          <View
            style={{
              backgroundColor: SyeongColors.gray_1,
              width: '100%',
              borderRadius: 8,
              padding: 16,
              minHeight: 172,
            }}>
            <TextInput
              value={reviewText}
              onChangeText={text => {
                setReviewText(text)
              }}
              multiline
              maxLength={350}
              placeholder="자유롭게 리뷰를 작성할 수 있어요"
              placeholderTextColor={SyeongColors.gray_4}
              style={{
                fontSize: 16,
                color: SyeongColors.gray_8,
                fontWeight: '500',
                lineHeight: 19.09,
                letterSpacing: -0.41,
                marginBottom: 30,
              }}
              autoComplete="off"
              autoCorrect={false}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                lineHeight: 19.09,
                letterSpacing: -0.41,
                color: SyeongColors.gray_4,
                position: 'absolute',
                bottom: 16,
                right: 16,
              }}>
              {reviewText.length} / 350
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={{paddingHorizontal: 20, marginTop: 20}}>
        <BasicButton
          backgroundColor={SyeongColors.main_3}
          text="완료하기"
          fullWidth
          textColor={SyeongColors.gray_1}
          onPress={() => {
            setIsModalVisible(true)
            // navigation.replace('CompleteScreen')
          }}
          disabled={!reviewTags.length || !reviewText.length}
        />
      </View>
      <Modal
        animationIn={'zoomIn'}
        animationOut={'zoomOut'}
        isVisible={isModalVisible}
        onBackButtonPress={() => {
          setIsModalVisible(false)
        }}
        onBackdropPress={() => {
          setIsModalVisible(false)
        }}
        style={{justifyContent: 'center', alignItems: 'center'}}
        backdropColor="#74747480">
        <View
          style={{
            backgroundColor: SyeongColors.gray_1,
            borderRadius: 15,
            paddingHorizontal: 16,
            alignItems: 'center',
          }}>
          <Image
            source={pencil_icon_sub3}
            style={{width: 60, height: 60, marginTop: 27, marginBottom: 16}}
          />
          <Text
            style={{
              color: SyeongColors.gray_8,
              fontSize: 16,
              fontWeight: '600',
              lineHeight: 19.09,
              letterSpacing: -0.41,
              marginBottom: 8,
            }}>
            작성한 리뷰를 등록할까요?
          </Text>
          <Text
            style={{
              color: SyeongColors.gray_4,
              fontSize: 14,
              fontWeight: '500',
              lineHeight: 19.6,
              letterSpacing: -0.41,
              textAlign: 'center',
              marginBottom: 36,
            }}>
            작성 완료한 수영장 키워드, 작성 리뷰를{'\n'}수영장 정보에 새롭게
            등록해 드려요
          </Text>
          <View style={{flexDirection: 'row', marginBottom: 16}}>
            <BasicButton
              width={136}
              height={44}
              text="아니요"
              backgroundColor={SyeongColors.gray_3}
              textColor={SyeongColors.gray_5}
              textSize={17}
              margin={[0, 15, 0, 0]}
              borderRadius={8}
              onPress={() => {
                setIsModalVisible(false)
              }}
            />
            <BasicButton
              width={136}
              height={44}
              text="등록하기"
              backgroundColor={SyeongColors.main_3}
              textColor={SyeongColors.gray_1}
              textSize={17}
              borderRadius={8}
              onPress={() => {
                navigation.replace('CompleteScreen')
              }}
            />
          </View>
        </View>
      </Modal>
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
    right: 20,
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
  titleRow: {
    marginTop: 48,
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  categoryTitle: {
    color: SyeongColors.main_4,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 16.71,
    letterSpacing: -0.41,
    marginBottom: 5,
  },
  tagButton: {
    backgroundColor: SyeongColors.gray_1,
    borderRadius: 8,
    height: 40,
    paddingHorizontal: 13,
    paddingVertical: 11,
    marginVertical: 4,
    marginRight: 36,
  },
  tagButtonText: {
    color: SyeongColors.gray_8,
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 17.9,
    letterSpacing: -0.41,
  },
})

export default WriteReviewScreen
