import { useAppDispatch, useAppSelector } from '@/modules/common'
import {
  setOnlyAvailable,
  setOnlyPaymentTransfer,
  setRadiusMt,
  setWithTwentyFourSeven,
  setWithValetParking,
} from '@/store'

export const useFilterSheet = () => {
  const {
    radiusMt,
    onlyAvailable,
    paymentTransfer,
    valetParking,
    twentyFourSeven,
  } = useAppSelector((state) => state.search)

  const dispatch = useAppDispatch()

  const handleOnlyAvailableChange = (value: boolean) => {
    dispatch(setOnlyAvailable(value))
  }

  const handlePaymentTransferChange = (value: boolean) => {
    dispatch(setOnlyPaymentTransfer(value))
  }

  const handleValetParkingChange = (value: boolean) => {
    dispatch(setWithValetParking(value))
  }

  const handleTwentyFourSevenChange = (value: boolean) => {
    dispatch(setWithTwentyFourSeven(value))
  }

  const handleRadiusMtChange = (value: number) => {
    dispatch(setRadiusMt(value))
  }

  return {
    radiusMt,
    onlyAvailable,
    paymentTransfer,
    valetParking,
    twentyFourSeven,
    handleOnlyAvailableChange,
    handlePaymentTransferChange,
    handleValetParkingChange,
    handleTwentyFourSevenChange,
    handleRadiusMtChange,
  }
}
