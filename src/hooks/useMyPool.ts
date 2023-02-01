import {DELETE_DeleteMyPool, GET_AddMyPool} from "../axios/user"
import {useUserAtomUpdate} from "./useUserAtom"
import {Alert} from "react-native"

export const useMyPoolAdd = async (poolid: string) => {
  try {
    const data = await GET_AddMyPool(poolid)
    useUserAtomUpdate()
  } catch (err) {
    console.log(err)
    Alert.alert("고정 수영장 등록에 실패했습니다. 다시 시도해주세요!")
  }
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
