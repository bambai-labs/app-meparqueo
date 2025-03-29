import { ParkingLotAvailability } from '../types'

export const parseAvailability = (availability: ParkingLotAvailability) => {
  const mapper: Record<ParkingLotAvailability, string> = {
    [ParkingLotAvailability.MORE_THAN_FIVE]: 'Disponible',
    [ParkingLotAvailability.LESS_THAN_FIVE]: 'Pocos espacios',
    [ParkingLotAvailability.NO_AVAILABILITY]: 'Lleno',
  }

  return mapper[availability]
}
