import { Service } from '../types'

export const parseService = (service: Service) => {
  const mapper: Record<Service, string> = {
    [Service.SECURITY]: 'Seguridad',
    [Service.CAR_WASH]: 'Lavado de autos',
    [Service.VALET_PARKING]: 'Aparcacoches',
  }

  return mapper[service]
}
