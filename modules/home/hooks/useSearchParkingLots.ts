import { MeParqueoApi, NearbyParkingLotsResponse } from '@/api'
import { useAppDispatch, useAppSelector } from '@/modules/common'
import { setParkingLots } from '@/store'
import { useState } from 'react'
import { FormValues } from '../components'
import { ParkingLotAvailability, PaymentMethod } from '../types'

export const useSearchParkingLots = () => {
  const [loading, setLoading] = useState(false)
  const [currentFilters, setCurrentFilters] = useState<FormValues>({
    onlyAvailable: false,
    paymentTransfer: false,
    valetParking: false,
    twentyFourSeven: false,
    radiusKm: 5,
  })
  const { parkingLots } = useAppSelector((state) => state.parking)
  const dispatch = useAppDispatch()

  const searchNearParkingLots = async (
    latitude: number,
    longitude: number,
    radiusKm: string = '5',
    onlyAvailableParkingLots: boolean = false,
    onlyTransferPayment: boolean = false,
    onlyValetParking: boolean = false,
    onlyTwentyFourSeven: boolean = false,
  ) => {
    try {
      setLoading(true)

      const params: Record<string, any> = {
        lat: latitude,
        lng: longitude,
        radiusKm,
      }

      if (onlyAvailableParkingLots) {
        params.availability = ParkingLotAvailability.MORE_THAN_FIVE
      }

      if (onlyTransferPayment) {
        params.paymentMethods = PaymentMethod.TRANSFER
      }

      const services: string[] = []
      if (onlyTwentyFourSeven) {
        services.push('24_HOURS')
      }
      if (onlyValetParking) {
        services.push('VALET')
      }
      if (services.length > 0) {
        params.services = services.join(',')
      }

      const response = await MeParqueoApi.get<NearbyParkingLotsResponse>(
        '/api/v1/parking-lot/find/nearby',
        { params },
      )

      dispatch(setParkingLots(response.data.data))
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return {
    currentFilters,
    loading,
    parkingLots,
    searchNearParkingLots,
    setCurrentFilters,
  }
}
