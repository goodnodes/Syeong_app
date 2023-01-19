import {AxiosInstance} from "."

const POST_Pnum_Request = async (pnum: string) => {
  const {data} = await AxiosInstance.post("/auth/request", {
    pnum: pnum,
  })
  return data
}

const POST_Validation_Check = async (
  code: string,
  requestId: string,
  requestTime: string,
) => {
  const {data} = await AxiosInstance.post("/auth/check", {
    code,
    requestId,
    requestTime,
  })
  return data
}

const POST_Signup = async (
  pnum: string,
  password: string,
  nickname: string,
  verifycode: string,
  requestId: string,
) => {
  const {data} = await AxiosInstance.post(
    "auth/signup",
    {
      privateinfo: {
        pnum,
        password,
        nickname: nickname,
      },
    },
    {params: {verifycode, requestid: requestId}},
  )
  return data
}

const POST_SignIn = async (pnum: string, pwd?: string) => {
  const data = await AxiosInstance.post("/auth", {pnum, pwd})
  return data
}

const GET_AutoSignIn = async () => {
  const data = await AxiosInstance.get("/auth/auto")
  return data
}

export {
  POST_Pnum_Request,
  POST_Validation_Check,
  POST_Signup,
  POST_SignIn,
  GET_AutoSignIn,
}
