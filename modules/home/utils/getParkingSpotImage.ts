import { ParkingLotAvailability } from '../types'

export const getParkingSpotImage = (availability: ParkingLotAvailability) => {
  const mapper: Record<ParkingLotAvailability, string> = {
    [ParkingLotAvailability.MORE_THAN_FIVE]: 'parking_spot_green.png',
    [ParkingLotAvailability.LESS_THAN_FIVE]: 'parking_spot_orange.png',
    [ParkingLotAvailability.NO_AVAILABILITY]: 'parking_spot_red.png',
  }

  return mapper[availability]
}
