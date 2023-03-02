import {DELETE_DeleteMyPool, GET_AddMyPool} from "../axios/user"
import {useUserAtomUpdate} from "./useUserAtom"
import {Alert} from "react-native"
import {getRecoil} from "recoil-nexus"
import {user} from "../atoms/auth"

export const useMyPoolAdd = async (poolid: string) => {
    const userAtom = getRecoil(user)
    if (userAtom.mypools && userAtom.mypools.length >= 5) {
      throw 'myPool limit'
    }
    const data = await GET_AddMyPool(poolid)
    useUserAtomUpdate()
}

export const useMyPoolDelete = async (poolid: string) => {
  try {
    const data = await DELETE_DeleteMyPool(poolid)
    useUserAtomUpdate()
  } catch (err) {
    console.log(err)
    Alert.alert("고정 해제에 실패했습니다. 다시 시도해주세요!")
  }
}
