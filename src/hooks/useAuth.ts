import CookieManager from "@react-native-cookies/cookies"
import {Alert} from "react-native"
import Config from "react-native-config"
import {setRecoil} from "recoil-nexus"
import { SERVER_URL } from "../../config"
import {authAtom, user} from "../atoms/auth"
import {GET_SignOut} from "../axios/auth"

export const useSignOut = async () => {
  try {
    const data = await GET_SignOut()
    const result = await CookieManager.setFromResponse(
      SERVER_URL,
      data.headers["set-cookie"]?.[0].split("Domain=localhost; ").join(""),
    )
    setRecoil(authAtom, false)
    setRecoil(user, {
      _id: "",
      privateinfo: {
        createdat: "",
        nickname: "",
        pnum: "",
      },
      mypools: [],
    })
    return data
  } catch (err) {
    console.log(err)
    Alert.alert("로그아웃에 실패했습니다. 다시 시도해주세요!")
  }
}
