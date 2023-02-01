import {atom} from 'recoil'

export interface PoolType {
  _id: string
  region: string
  name: string
  url: string
  pnum: string
  imgurl: string
  outsideimgurl: string
  freeswiminfourl: string
  city: string
  address: string
  lanelength: number
  lanenum: number
  costinfourl: string
  geo: {
    latitude: string
    longitude: string
  }
}

export const pool = atom<PoolType[]>({
  key: 'pool',
  default:[]
})
