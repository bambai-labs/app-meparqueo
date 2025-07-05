import { MeParqueoApi, NearbyParkingLotsResponse } from '@/api'
import { CITY_CENTER, useAppDispatch, useAppSelector } from '@/modules/common'
import { setIsSheetExpanded } from '@/store/bottomsheet/bottomSheetSlice'
import { setAllParkingLots } from '@/store/parking/parkingSlice'
import BottomSheet from '@gorhom/bottom-sheet'
import { Camera } from '@rnmapbox/maps'
import { isAxiosError } from 'axios'
import { useEffect, useRef, useState } from 'react'
import { Alert, Linking, Platform } from 'react-native'
import { ParkingLot } from '../types'

export const useAllParkingLots = () => {
  const dispatch = useAppDispatch()
  const cameraRef = useRef<Camera>(null)
  const bottomSheetRef = useRef<BottomSheet>(null)
  const reportSheetRef = useRef<BottomSheet>(null)
  const { deviceLocation } = useAppSelector((state) => state.location)
  const { allParkingLots } = useAppSelector((state) => state.parking)
  const [currentParking, setCurrentParking] = useState<ParkingLot | undefined>(
    undefined,
  )

  const handleMapFinishLoading = () => {
    cameraRef.current?.setCamera({
      centerCoordinate: CITY_CENTER,
      zoomLevel: 14,
      heading: 0,
      animationDuration: 0,
    })
  }

  const fetchAllParkingLots = async () => {
    try {
      const response = await MeParqueoApi.get<NearbyParkingLotsResponse>(
        '/api/v1/parking-lot',
      )

      dispatch(setAllParkingLots(response.data.data))
    } catch (error) {
      console.log(error)
    }
  }

  const setCameraPosition = (
    position: [number, number],
    animated: boolean = true,
  ) => {
    cameraRef.current?.setCamera({
      centerCoordinate: position,
      zoomLevel: 17,
      heading: 0,
      animationDuration: animated ? 1000 : 0,
    })
  }

  const handleParkingMarkerPress = (parkingLot: ParkingLot) => {
    setCurrentParking(parkingLot)
    setCameraPosition([parkingLot.longitude, parkingLot.latitude])
  }

  const handleParkingCardPress = (parking: ParkingLot) => {
    setCurrentParking(parking)
    setCameraPosition([parking.longitude, parking.latitude])
    openBottomSheet()
  }

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand()
  }

  const openMapDirection = async () => {
    const currentLat = deviceLocation?.[1]
    const currentLon = deviceLocation?.[0]
    const destinationLat = currentParking?.latitude
    const destinationLon = currentParking?.longitude

    saveRecentParking()

    if (Platform.OS === 'ios') {
      const appleMapsScheme = `maps://?saddr=${currentLat},${currentLon}&daddr=${destinationLat},${destinationLon}`
      const appleMapsFallback = `http://maps.apple.com/?saddr=${currentLat},${currentLon}&daddr=${destinationLat},${destinationLon}`

      const canOpenApple = await Linking.canOpenURL(appleMapsScheme)

      if (canOpenApple) {
        Linking.openURL(appleMapsScheme)
      } else {
        Linking.openURL(appleMapsFallback)
      }

      return
    }

    const schemeURL = `comgooglemaps://?saddr=${currentLat},${currentLon}&daddr=${destinationLat},${destinationLon}&directionsmode=driving`
    const fallbackURL = `https://www.google.com/maps/dir/${currentLat},${currentLon}/${destinationLat},${destinationLon}/`

    const canOpenGoogle = await Linking.canOpenURL(schemeURL)

    if (canOpenGoogle) {
      Linking.openURL(schemeURL)
    } else {
      Linking.openURL(fallbackURL)
    }
  }

  const saveRecentParking = async () => {
    try {
      await MeParqueoApi.post('/api/v1/user/recently-parked', {
        parkingLotId: currentParking?.id,
        destinationLocation: {
          latitude: currentParking?.latitude,
          longitude: currentParking?.longitude,
          searchTerm: currentParking?.name,
        },
        distanceMt: 0,
      })

      console.log('Parking destination saved')
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response?.data)
        return
      }

      console.log(error)
    }
  }

  const callParkingLot = async () => {
    const url = `tel:${currentParking?.phoneNumber}`
    try {
      await Linking.openURL(url)
    } catch (err) {
      Alert.alert('Error', 'Algo salió mal al intentar hacer la llamada')
      console.error(err)
    }
  }

  const hideReportSheet = () => {
    reportSheetRef.current?.close()
  }

  const showReportSheet = () => {
    reportSheetRef.current?.expand()
  }

  const handleSheetChange = (index: number) => {
    dispatch(setIsSheetExpanded(index > -1))
  }

  useEffect(() => {
    const updatedCurrentParkingLot = allParkingLots.find(
      (parkingLot) => parkingLot.id === currentParking?.id,
    )

    if (updatedCurrentParkingLot) {
      setCurrentParking(updatedCurrentParkingLot)
    }
  }, [allParkingLots])

  useEffect(() => {
    fetchAllParkingLots()
  }, [])

  return {
    reportSheetRef,
    currentParking,
    parkingLots: allParkingLots,
    cameraRef,
    bottomSheetRef,
    handleMapFinishLoading,
    handleParkingMarkerPress,
    handleParkingCardPress,
    openBottomSheet,
    showReportSheet,
    hideReportSheet,
    openMapDirection,
    callParkingLot,
    handleSheetChange,
  }
}
