import React, { useState } from 'react'
import { SafeAreaView } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LandingScreen from './screens/auth/LandingScreen'
import SignInScreen from './screens/auth/SignInScreen'
import SignUpScreen from './screens/auth/SignUpScreen'
import MainTabScreen from './screens/main/MainTabScreen'

const Stack = createNativeStackNavigator()

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  return (
    <NavigationContainer>
      <SafeAreaView style={{flex: 1}}>
        <Stack.Navigator>
          {isLoggedIn ? (
            <Stack.Group screenOptions={{headerShown: false}}>
              <Stack.Screen name="MainTabScreen" component={MainTabScreen} />
              <Stack.Screen name="MyMainScreen" component={MainTabScreen} />
            </Stack.Group>
          ) : (
            <Stack.Group>
              <Stack.Screen name="LandingScreen" component={LandingScreen} />
              <Stack.Screen name="SignInScreen" component={SignInScreen} />
              <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  )
}

export default App
