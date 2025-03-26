export interface ParkingLot {
  id: string
  name: string
  availability: ParkingLotAvailability
  status: ParkingStatus
  latitude: number
  longitude: number
  price: number
  imageUrls: string[]
  paymentMethods: string[]
  services: string[]
  phoneNumber: string
  distanceKm: number
}

export enum ParkingLotAvailability {
  LESS_THAN_FIVE = 'LESS_THAN_FIVE',
  MORE_THAN_FIVE = 'MORE_THAN_FIVE',
  NO_AVAILABILITY = 'NO_AVAILABILITY',
}

export enum ParkingStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

export interface RecentParkingLot extends ParkingLot {
  timestamp: number
}

export interface ParkingUpdateEstatus {
  parkingLotId: string
  status: ParkingStatus
  availability: ParkingLotAvailability
  updatedAt: string
}
