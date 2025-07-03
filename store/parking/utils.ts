import {
  ParkingLotAvailability,
  ParkingStatus,
} from '../../modules/home/types/Parking'

export interface ParkingUpdateEstatus {
  id: string
  parkingLotId: string
  status: ParkingStatus
  availability: ParkingLotAvailability
  updatedAt: string
}

export const updateParkingLot = <T extends { id: string }>(
  parkingLots: T[],
  parkingLotId: string,
  updates: Partial<ParkingUpdateEstatus>,
): T[] => {
  return parkingLots.map((parking) =>
    parking.id === parkingLotId ? { ...parking, ...updates } : parking,
  )
}
