import React from 'react'
import { atom, useRecoilState } from 'recoil'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LandingScreen from './screens/auth/LandingScreen'
import SignInScreen from './screens/auth/SignInScreen'
import SignUpScreen from './screens/auth/SignUpScreen'
import NicknameSettingScreen from './screens/auth/SignUpScreen/NicknameSettingScreen'
import PasswordSettingScreen from './screens/auth/SignUpScreen/PasswordSettingScreen'
import ValidateNumberScreen from './screens/auth/SignUpScreen/ValidateNumberScreen'
import MainTabScreen from './screens/main/MainTabScreen'
import EditProfileScreen from './screens/my/EditProfileScreen'
import MyMainScreen from './screens/my/MyMainScreen'
import MySettingScreen from './screens/my/MySettingScreen'
import MySettingProposalScreen from './screens/my/MySettingScreen/MySettingProposalScreen'
import MySettingWithdrawalScreen from './screens/my/MySettingScreen/MySettingWithdrawalScreen'
import { authAtom } from './atoms/auth'

const Stack = createNativeStackNavigator()



const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useRecoilState(authAtom)

  return (
    <NavigationContainer>
        <Stack.Navigator>
          {isLoggedIn ? (
            <Stack.Group screenOptions={{headerShown: false}}>
              <Stack.Screen name="MainTabScreen" component={MainTabScreen} />
              <Stack.Screen name="MyMainScreen" component={MyMainScreen} />
              <Stack.Screen
                name="EditProfileScreen"
                component={EditProfileScreen}
              />
              <Stack.Screen
                name="MySettingScreen"
                component={MySettingScreen}
              />
              <Stack.Screen
                name="MySettingProposalScreen"
                component={MySettingProposalScreen}
              />
              <Stack.Screen
                name="MySettingWithdrawalScreen"
                component={MySettingWithdrawalScreen}
              />
            </Stack.Group>
          ) : (
            <Stack.Group screenOptions={{headerShown: false}}>
              <Stack.Screen name="LandingScreen" component={LandingScreen} />
              <Stack.Screen name="SignInScreen" component={SignInScreen} />
              <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
              <Stack.Screen
                name="ValidateNumberScreen"
                component={ValidateNumberScreen}
              />
              <Stack.Screen
                name="PasswordSettingScreen"
                component={PasswordSettingScreen}
              />
              <Stack.Screen
                name="NicknameSettingScreen"
                component={NicknameSettingScreen}
              />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
  )
}

export default App
