import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native'
import React from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import {SyeongColors} from '../../../components/Colors'
import Header from '../../../components/Header/Header'
import {fire_icon, search_icon_white, user_icon} from '../../../../assets/icons'

const RecordMainScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar barStyle={'dark-content'} />
      <Header backgroundColor={SyeongColors.gray_1}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SearchMainScreen')
            }}>
            <Image
              source={search_icon_white}
              style={{width: 24, height: 24, tintColor: SyeongColors.gray_8}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MyMainScreen')
            }}>
            <Image
              source={user_icon}
              style={{width: 24, height: 24, tintColor: SyeongColors.gray_8}}
            />
          </TouchableOpacity>
        </View>
      </Header>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={fire_icon}
          style={{width: 80, height: 80, marginBottom: 36}}
        />
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            lineHeight: 21.48,
            letterSpacing: -0.41,
            color: SyeongColors.gray_8,
            marginBottom: 12,
          }}>
          기록 지금 준비중!
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '500',
            lineHeight: 22.4,
            letterSpacing: -0.41,
            color: SyeongColors.gray_4,
            textAlign: 'center',
          }}>
          나의 수영 데이터를 저장하고{'\n'}다른 사람에게 공유도 쉽게 할 수
          있어요
        </Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: SyeongColors.gray_1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export default RecordMainScreen
