export interface SponsorsResponse {
  statusCode: number
  timestamp: Date
  success: boolean
  message: string
  data: Data
}

export interface Data {
  sponsors: Sponsors[]
}

export interface Sponsors {
  name: string
  image: string
}
