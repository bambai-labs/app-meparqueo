export enum DistanceMode {
  WALKING = 'WALKING',
  DRIVING = 'DRIVING',
  BICYCLING = 'BICYCLING',
  TRANSIT = 'TRANSIT',
}

export const getDistanceModes = (): DistanceMode[] => {
  return [
    DistanceMode.WALKING,
    DistanceMode.DRIVING,
    DistanceMode.BICYCLING,
    DistanceMode.TRANSIT,
  ]
}
