import { ParkingLot } from '@/modules'

export interface NearbyParkingLotsResponse {
  statusCode: number
  timestamp: Date
  success: boolean
  message: string
  data: ParkingLot[]
}

export interface Image {
  id: string
  key: string
  url: string
  name: string
  size: number
  isNew?: boolean
  metadata: Metadata
  mimeType: string
}

export interface Metadata {
  width: number
  format: string
  height: number
}
