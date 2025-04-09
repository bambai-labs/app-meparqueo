import { ParkingLotAvailability } from '../types'

export const getAvailabilityIndicatorStyles = (
  availability: ParkingLotAvailability,
) => {
  interface AvailabilityIndicatorStyle {
    indicatorColor: string
    indicatorText: string
  }

  const defaultStyle: AvailabilityIndicatorStyle = {
    indicatorColor: 'bg-gray-400',
    indicatorText: 'Desconectado',
  }
  const styles: Record<ParkingLotAvailability, AvailabilityIndicatorStyle> = {
    [ParkingLotAvailability.MORE_THAN_FIVE]: {
      indicatorColor: 'bg-green-500',
      indicatorText: 'Disponible',
    },

    [ParkingLotAvailability.LESS_THAN_FIVE]: {
      indicatorColor: 'bg-yellow-400',
      indicatorText: 'Pocos espacios',
    },

    [ParkingLotAvailability.NO_AVAILABILITY]: {
      indicatorColor: 'bg-red-800',
      indicatorText: 'Lleno',
    },
  }

  return styles[availability] ?? defaultStyle
}
