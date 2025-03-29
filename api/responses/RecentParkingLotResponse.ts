import { ParkingLot } from '@/modules'

export interface RecentParkingLotResponse {
  id: string
  parkingLot: ParkingLot
  viewedAt: string
}
