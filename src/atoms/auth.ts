import {atom} from "recoil"

export interface UserAtomType {
  _id: string
  privateinfo: {
    createdat: string
    nickname: string
    pnum: string
    goal?: string
  }
  mypools?: string[]
}

export const authAtom = atom({
  key: "auth",
  default: false,
})

export const user = atom<UserAtomType>({
  key: "user",
  default: {
    _id: "",
    privateinfo: {
      createdat: "",
      nickname: "",
      pnum: "",
    },
    mypools: [],
  },
})
