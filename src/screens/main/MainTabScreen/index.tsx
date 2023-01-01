import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import HomeMainScreen from '../../home/HomeMainScreen'
import RecordMainScreen from '../../record/RecordMainScreen'
import SearchMainScreen from '../../search/SearchMainScreen'

const Tab = createBottomTabNavigator()

const MainTabScreen = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="HomeMainScreen"
        component={HomeMainScreen}
        options={{title: '홈'}}
      />
      <Tab.Screen
        name="SearchMainScreen"
        component={SearchMainScreen}
        options={{title: '탐색'}}
      />
      <Tab.Screen
        name="RecordMainScreen"
        component={RecordMainScreen}
        options={{title: '기록'}}
      />
    </Tab.Navigator>
  )
}

export default MainTabScreen
