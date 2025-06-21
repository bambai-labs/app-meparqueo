export interface SponsorsResponse {
  statusCode: number
  timestamp: Date
  success: boolean
  message: string
  data: SponsorsData
}

export interface SponsorsData {
  sponsors: Sponsors[]
}

export interface Sponsors {
  name: string
  image: string
}
