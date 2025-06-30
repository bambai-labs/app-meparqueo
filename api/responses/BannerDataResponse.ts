export interface BannerDataResponse {
  statusCode: number
  timestamp: Date
  success: boolean
  message: string
  data: BannerData
}

export interface BannerData {
  link: string
  image: string
  background: string
  visibility: boolean
}
