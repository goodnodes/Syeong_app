import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import React from 'react'
import {Image, Text} from 'react-native'
import {home_icon, note_icon, search_icon_white} from '../../../../assets/icons'
import {SyeongColors} from '../../../components/Colors'
import HomeMainScreen from '../../home/HomeMainScreen'
import RecordMainScreen from '../../record/RecordMainScreen'
import SearchMainScreen from '../../search/SearchMainScreen'

const Tab = createBottomTabNavigator()

const MainTabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          height: 90,
          paddingTop: 7,paddingBottom: 34
        },
      }}>
      <Tab.Screen
        name="HomeMainScreen"
        component={HomeMainScreen}
        options={{
          tabBarLabel: ({focused}) => {
            return (
              <Text
                style={[
                  {
                    fontSize: 12,
                    fontWeight: '500',
                    lineHeight: 14.32,
                    letterSpacing: -0.41,
                  },
                  focused
                    ? {color: SyeongColors.main_4}
                    : {color: SyeongColors.gray_3},
                ]}>
                홈
              </Text>
            )
          },
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={home_icon}
                style={[
                  {width: 24, height: 24},
                  focused
                    ? {tintColor: SyeongColors.main_4}
                    : {tintColor: SyeongColors.gray_3},
                ]}
              />
            )
          },
        }}
      />
      <Tab.Screen
        name="SearchMainScreen"
        component={SearchMainScreen}
        options={{
          tabBarLabel: ({focused}) => {
            return (
              <Text
                style={[
                  {
                    fontSize: 12,
                    fontWeight: '500',
                    lineHeight: 14.32,
                    letterSpacing: -0.41,
                  },
                  focused
                    ? {color: SyeongColors.main_4}
                    : {color: SyeongColors.gray_3},
                ]}>
                탐색
              </Text>
            )
          },
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={search_icon_white}
                style={[
                  {width: 24, height: 24},
                  focused
                    ? {tintColor: SyeongColors.main_4}
                    : {tintColor: SyeongColors.gray_3},
                ]}
              />
            )
          },
        }}
      />
      <Tab.Screen
        name="RecordMainScreen"
        component={RecordMainScreen}
        options={{
          tabBarLabel: ({focused}) => {
            return (
              <Text
                style={[
                  {
                    fontSize: 12,
                    fontWeight: '500',
                    lineHeight: 14.32,
                    letterSpacing: -0.41,
                  },
                  focused
                    ? {color: SyeongColors.main_4}
                    : {color: SyeongColors.gray_3},
                ]}>
                기록
              </Text>
            )
          },
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={note_icon}
                style={[
                  {width: 24, height: 24},
                  focused
                    ? {tintColor: SyeongColors.main_4}
                    : {tintColor: SyeongColors.gray_3},
                ]}
              />
            )
          },
        }}
      />
    </Tab.Navigator>
  )
}

export default MainTabScreen
