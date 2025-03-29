import {
  BikeIcon,
  BusFront,
  CarFront,
  Footprints,
  LucideIcon,
} from 'lucide-react-native'
import { DistanceMode } from '../types'

export const getDistanceModeIcon = (distanceMode: DistanceMode): LucideIcon => {
  const mapper: Record<DistanceMode, LucideIcon> = {
    [DistanceMode.DRIVING]: CarFront,
    [DistanceMode.WALKING]: Footprints,
    [DistanceMode.BICYCLING]: BikeIcon,
    [DistanceMode.TRANSIT]: BusFront,
  }

  return mapper[distanceMode]
}
