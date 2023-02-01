import {AxiosInstance} from "."

const GET_UserInfo = async () => {
  const {data} = await AxiosInstance.get("/user")
  return data
}

const POST_EditMyInfo = async (
  legacyNickname: string,
  newNickname: string,
  goal: string,
) => {
  const {data} = await AxiosInstance.post("/user", {
    legacy: legacyNickname,
    new: newNickname,
    goal,
  })
}
const GET_AddMyPool = async (poolid: string) => {
  const {data} = await AxiosInstance.get("/user/pool", {
    params: {
      poolid,
    },
  })
  return data
}

const DELETE_DeleteMyPool = async (poolid: string) => {
  const {data} = await AxiosInstance.delete("/user/pool", {
    params: {
      poolid,
    },
  })

  return data
}

const DELETE_DeleteUserAccount = async () => {
  const {data} = await AxiosInstance.delete("/user")
  return data
}

export {
  GET_UserInfo,
  POST_EditMyInfo,
  GET_AddMyPool,
  DELETE_DeleteMyPool,
  DELETE_DeleteUserAccount,
}
