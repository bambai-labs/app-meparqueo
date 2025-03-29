import { MeParqueoApi, NearbyParkingLotsResponse } from '@/api'
import { useAppDispatch, useAppSelector } from '@/modules/common'
import { setParkingLots } from '@/store'
import { useState } from 'react'

export const useSearchParkingLots = () => {
  const [loading, setLoading] = useState(false)
  const { parkingLots } = useAppSelector((state) => state.parking)
  const dispatch = useAppDispatch()

  const searchNearParkingLots = async (
    latitude: number,
    longitude: number,
    radiusKm: string = '5',
    availability: string = '',
    paymentMethods: string = '',
    priceMax: string = '',
    priceMin: string = '',
    services: string = '',
  ) => {
    try {
      setLoading(true)

      console.log(
        'endpoint',
        `/api/v1/parking-lot/find/nearby?lat=${latitude}&lng=${longitude}&radiusKm=${radiusKm}${availability === '' ? '' : `&availability=${availability}`}${paymentMethods === '' ? '' : `&paymentMethods=${paymentMethods}`}${priceMax === '' ? '' : `&priceMax=${priceMax}`}${priceMin === '' ? '' : `&priceMin=${priceMin}`}${services === '' ? '' : `&services=${services}`}`,
      )

      console.log(
        'receiving values',
        latitude,
        longitude,
        radiusKm,
        availability,
        paymentMethods,
        priceMax,
        priceMin,
        services,
      )

      const response = await MeParqueoApi.get<NearbyParkingLotsResponse>(
        `/api/v1/parking-lot/find/nearby?lat=${latitude}&lng=${longitude}&radiusKm=${radiusKm}${availability === '' ? '' : `&availability=${availability}`}${paymentMethods === '' ? '' : `&paymentMethods=${paymentMethods}`}${priceMax === '' ? '' : `&priceMax=${priceMax}`}${priceMin === '' ? '' : `&priceMin=${priceMin}`}${services === '' ? '' : `&services=${services}`}`,
      )

      dispatch(setParkingLots(response.data.data))
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
