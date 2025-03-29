export enum FilterType {
  AVAILABILITY = 'AVAILABILITY',
  PRICE = 'PRICE',
  DISTANCE = 'DISTANCE',
  PAYMENT_METHOD = 'PAYMENT_METHOD',
  SERVICE = 'SERVICE',
}

export const getFilterTypes = (): FilterType[] => {
  return [
    FilterType.AVAILABILITY,
    FilterType.PRICE,
    FilterType.DISTANCE,
    FilterType.PAYMENT_METHOD,
    FilterType.SERVICE,
  ]
}
