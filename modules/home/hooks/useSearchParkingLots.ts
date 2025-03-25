import { MeParqueoApi, NearbyParkingLotsResponse } from '@/api'
import { useState } from 'react'
import { ParkingLot } from '../types'

export const useSearchParkingLots = () => {
  const [loading, setLoading] = useState(false)
  const [parkingLots, setParkingLots] = useState<ParkingLot[]>([])

  const searchNearParkingLots = async (
    latitude: number,
    longitude: number,
    radius: number = 5,
  ) => {
    try {
      setLoading(true)

      const response = await MeParqueoApi.get<NearbyParkingLotsResponse>(
        `/api/v1/parking-lot/find/nearby?lat=${latitude}&lng=${longitude}&radiusKm=${radius}`,
      )

      setParkingLots(response.data.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    parkingLots,
    searchNearParkingLots,
  }
}
