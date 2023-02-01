import { GET_UserInfo } from "../axios/user"
import { setRecoil } from "recoil-nexus"
import { user } from "../atoms/auth"

export const useUserAtomUpdate = async()=>{
    try {
      const data = await GET_UserInfo()
      setRecoil(user, data.result)
    } catch (err) {
      console.log(err)
    }
}