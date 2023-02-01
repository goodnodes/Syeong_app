import React, {useEffect} from "react"
import {atom, useRecoilState, useSetRecoilState} from "recoil"
import axios from "axios"
import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import LandingScreen from "./screens/auth/LandingScreen"
import SignInScreen from "./screens/auth/SignInScreen"
import SignUpScreen from "./screens/auth/SignUpScreen"
import NicknameSettingScreen from "./screens/auth/SignUpScreen/NicknameSettingScreen"
import PasswordSettingScreen from "./screens/auth/SignUpScreen/PasswordSettingScreen"
import ValidateNumberScreen from "./screens/auth/SignUpScreen/ValidateNumberScreen"
import MainTabScreen from "./screens/main/MainTabScreen"
import EditProfileScreen from "./screens/my/EditProfileScreen"
import MyMainScreen from "./screens/my/MyMainScreen"
import MySettingScreen from "./screens/my/MySettingScreen"
import MySettingProposalScreen from "./screens/my/MySettingScreen/MySettingProposalScreen"
import MySettingWithdrawalScreen from "./screens/my/MySettingScreen/MySettingWithdrawalScreen"
import {authAtom, user} from "./atoms/auth"
import PasswordSignInScreen from "./screens/auth/SignInScreen/PasswordSignInScreen"
import SearchDetailScreen from "./screens/search/SearchDetailScreen"
import ReviewDetailScreen from "./screens/search/SearchDetailScreen/ReviewDetailScreen"
import WriteReviewScreen from "./screens/search/SearchDetailScreen/WriteReviewScreen"
import CompleteScreen from "./screens/search/SearchDetailScreen/CompleteScreen"
import EditPasswordValidateScreen from "./screens/my/MySettingScreen/EditPasswordValidateScreen"
import EditPasswordScreen from "./screens/my/MySettingScreen/EditPasswordScreen"
import {GET_UserInfo} from "./axios/user"
import {GET_PoolInfo} from "./axios/pool"
import {pool} from "./atoms/pool"
import {GET_AutoSignIn} from "./axios/auth"
import EditPasswordValidateCheckScreen from "./screens/my/MySettingScreen/EditPasswordValidateCheckScreen"
import EditMyReviewScreen from "./screens/my/MyMainScreen/EditMyReviewScreen"

const Stack = createNativeStackNavigator()

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(authAtom)
  const setUserAtom = useSetRecoilState(user)
  const setPoolAtom = useSetRecoilState(pool)

  useEffect(() => {
    requestSignInAuto()
  }, [])

  useEffect(() => {
    if (!isLoggedIn) return
    getUserInfo()
    getPoolInfo()
  }, [isLoggedIn])

  const requestSignInAuto = async () => {
    try {
      const data = await GET_AutoSignIn()
      setIsLoggedIn(true)
    } catch (err) {
      console.log(err)
    }
  }

  const getUserInfo = async () => {
    try {
      const data = await GET_UserInfo()

      setUserAtom(data.result)
    } catch (err) {
      console.log(err)
    }
  }

  const getPoolInfo = async () => {
    try {
      const data = await GET_PoolInfo()

      setPoolAtom(data.pools)
    } catch (err) {
      console.log(err)
    }
  }

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
            <Stack.Screen name="MySettingScreen" component={MySettingScreen} />
            <Stack.Screen
              name="MySettingProposalScreen"
              component={MySettingProposalScreen}
            />
            <Stack.Screen
              name="MySettingWithdrawalScreen"
              component={MySettingWithdrawalScreen}
            />
            <Stack.Screen
              name="EditPasswordScreen"
              component={EditPasswordScreen}
            />
            <Stack.Screen
              name="EditPasswordValidateScreen"
              component={EditPasswordValidateScreen}
            />
            <Stack.Screen
              name="EditPasswordValidateCheckScreen"
              component={EditPasswordValidateCheckScreen}
            />
            <Stack.Screen
              name="SearchDetailScreen"
              component={SearchDetailScreen}
            />
            <Stack.Screen
              name="ReviewDetailScreen"
              component={ReviewDetailScreen}
            />
            <Stack.Screen
              name="WriteReviewScreen"
              component={WriteReviewScreen}
              options={{gestureDirection: "vertical"}}
            />
            <Stack.Screen
              name="EditMyReviewScreen"
              component={EditMyReviewScreen}
              options={{gestureDirection: "vertical"}}
            />
            <Stack.Screen name="CompleteScreen" component={CompleteScreen} />
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
            <Stack.Screen
              name="PasswordSignInScreen"
              component={PasswordSignInScreen}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
