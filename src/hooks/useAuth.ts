import {Alert} from "react-native"
import {setRecoil} from "recoil-nexus"
import {authAtom} from "../atoms/auth"
import {GET_SignOut} from "../axios/auth"

export const useSignOut = async () => {
  try {
    const data = GET_SignOut()
    setRecoil(authAtom, false)
  } catch (err) {
    console.log(err)
    Alert.alert("로그아웃에 실패했습니다. 다시 시도해주세요!")
  }
}
