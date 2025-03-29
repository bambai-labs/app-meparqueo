import { FilterType } from '../types'

export const parseFilterType = (type: FilterType): string => {
  const mapper: Record<FilterType, string> = {
    [FilterType.AVAILABILITY]: 'Disponibilidad',
    [FilterType.PRICE]: 'Precio',
    [FilterType.DISTANCE]: 'Distancia',
    [FilterType.PAYMENT_METHOD]: 'Métodos de pago',
    [FilterType.SERVICE]: 'Servicios',
  }

  return mapper[type]
}
