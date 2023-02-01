export type KeywordType =
  | "깨끗한 물"
  | "청결한 샤워실"
  | "편리한 센터 이용"
  | "충분한 레인"
  | "적당한 물 온도"
  | "합리적인 가격"
  | "편리한 대중 교통 이용"
  | "넓은 주차공간"
  | "다양한 주변 맛집"
  | "눈부신 채광"
  | "오리발 사용 가능"
  | "개인 기구 사용 가능"

export type ReviewTagsCategory = "clean" | "service" | "price" | "access" | "etc"

export type ReviewTags = {
  [key in ReviewTagsCategory]: KeywordType[]
}

export const reviewTagsData: ReviewTags = {
  clean: ["깨끗한 물", "청결한 샤워실"],
  service: ["편리한 센터 이용", "충분한 레인", "적당한 물 온도"],
  price: ["합리적인 가격"],
  access: ["편리한 대중 교통 이용", "넓은 주차공간", "다양한 주변 맛집"],
  etc: ["눈부신 채광", "오리발 사용 가능", "개인 기구 사용 가능"],
}
