import { ParkingUpdateEstatus } from '../types'

export const updateParkingLot = <T extends { id: string }>(
  parkingLots: T[],
  parkingLotId: string,
  updates: Partial<ParkingUpdateEstatus>,
): T[] => {
  return parkingLots.map((parking) =>
    parking.id === parkingLotId ? { ...parking, ...updates } : parking,
  )
}
