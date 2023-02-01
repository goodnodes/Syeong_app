import {AxiosInstance} from "."

const GET_PoolInfo = async () => {
  const {data} = await AxiosInstance.get("/pool")
  return data
}



export {GET_PoolInfo}