import {AxiosInstance} from "."
import { KeywordType } from "../../assets/static/keyword"
import { ReviewType } from "../screens/search/SearchDetailScreen"

const GET_ReviewByPool = async (poolId: string) => {
  const {data} = await AxiosInstance.get("/review/pool", {
    params: {
      poolid: poolId,
    },
  })
  return data
}

const POST_AddReview = async (
  poolid: string,
  {textreview, keywordreviews}: {textreview: string; keywordreviews: string[]},
) => {
  const {data} = await AxiosInstance.post("/review", {
    poolid,
    textreview,
    keywordreviews,
  })
  return data
}

const GET_ReviewByUser = async () => {
  const {data} = await AxiosInstance.get("/review/user")
  return data
}

const PATCH_EditReview = async (
  reviewId: string,
  lecacyReview: ReviewType,
  {
    poolid,
    userid,
    textreview,
    keywordreviews,
  }: {
    poolid: string
    userid: string
    textreview: string
    keywordreviews: KeywordType[]
  },
) => {
  const {data} = await AxiosInstance.patch("/review",[ lecacyReview,{
    _id: reviewId,
    poolid,
    userid,
    textreview,
    keywordreviews,
  }])
  return data
}

const DELETE_Review = async (reviewid: string, userid: string) => {
  const {data} = await AxiosInstance.delete("/review", {
    params: {
      reviewid,
      userid,
    },
  })
  return data
}

export {
  GET_ReviewByPool,
  POST_AddReview,
  GET_ReviewByUser,
  PATCH_EditReview,
  DELETE_Review,
}
