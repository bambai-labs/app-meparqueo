import { RecentParkingLotResponse } from './'

export interface PaginationResponse {
  statusCode: number
  timestamp: Date
  success: boolean
  message: string
  data: Data
}

export interface Data {
  data: RecentParkingLotResponse[]
  pagination: Pagination
}

export interface Pagination {
  total: number
  page: number
  limit: number
  totalPages: number
}
