import { MeParqueoApi, NearbyParkingLotsResponse } from '@/api'
import { useAppSelector } from '@/modules/common'
import BottomSheet from '@gorhom/bottom-sheet'
import { Camera } from '@rnmapbox/maps'
import { useEffect, useRef, useState } from 'react'
import { Alert, Linking, Platform } from 'react-native'
import { ParkingLot } from '../types'

export const useAllParkingLots = () => {
  const cameraRef = useRef<Camera>(null)
  const bottomSheetRef = useRef<BottomSheet>(null)
  const { deviceLocation } = useAppSelector((state) => state.location)
  const [parkingLots, setParkingLots] = useState<ParkingLot[]>([])
  const [currentParking, setCurrentParking] = useState<ParkingLot | undefined>(
    undefined,
  )
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)

  const handleMapFinishLoading = () => {
    deviceLocation &&
      cameraRef.current?.setCamera({
        centerCoordinate: deviceLocation,
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

      setParkingLots(response.data.data)
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
      zoomLevel: 14,
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

  const callParkingLot = async () => {
    const url = `tel:${currentParking?.phoneNumber}`
    try {
      await Linking.openURL(url)
    } catch (err) {
      Alert.alert('Error', 'Algo salió mal al intentar hacer la llamada')
      console.error(err)
    }
  }

  const hideReportModal = () => {
    setIsReportModalOpen(false)
  }

  const showReportModal = () => {
    setIsReportModalOpen(true)
  }

  useEffect(() => {
    fetchAllParkingLots()
  })

  return {
    isReportModalOpen,
    currentParking,
    parkingLots,
    cameraRef,
    bottomSheetRef,
    handleMapFinishLoading,
    handleParkingMarkerPress,
    handleParkingCardPress,
    openBottomSheet,
    showReportModal,
    hideReportModal,
    openMapDirection,
    callParkingLot,
  }
}
