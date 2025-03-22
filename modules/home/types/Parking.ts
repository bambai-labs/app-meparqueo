export interface ParkingLot {
  name: string
  availability: ParkingLotAvailability
  status: ParkingStatus
  latitude: number
  longitude: number
  price: number
  images: string[]
  paymentMethods: string[]
  services: string[]
  phoneNumber: string
}

export enum ParkingLotAvailability {
  LESS_THAN_FIVE,
  MORE_THAN_FIVE,
  NO_AVAILABILITY,
}

export enum ParkingStatus {
  OPEN,
  CLOSED,
}

export interface RecentParkingLot extends ParkingLot {
  timestamp: number
}
