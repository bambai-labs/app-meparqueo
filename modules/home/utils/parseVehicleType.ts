import { VehicleType } from '../types/'

export const parseVehicleType = (vehicleType: VehicleType) => {
  const mapper = {
    [VehicleType.CAR]: 'Carro',
    [VehicleType.MOTORCYCLE]: 'Motocicleta',
  }

  return mapper[vehicleType]
}
