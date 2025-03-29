import { MeParqueoApi, socketManager } from '@/api'
import { LoginResponse } from '@/api/responses/LoginResponse'
import { useAppSelector } from '@/modules/common'
import BottomSheet from '@gorhom/bottom-sheet'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import { Alert, Linking, Platform } from 'react-native'
import { v4 as uuidv4 } from 'uuid'
import { ParkingLot } from '../types'

export const useHome = () => {
  const router = useRouter()
  const { deviceLocation } = useAppSelector((state) => state.location)
  const [chipSelected, setChipSelected] = useState(false)
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [currentParking, setCurrentParking] = useState<ParkingLot | undefined>(
    undefined,
  )
  const [recentParkingLots, setRecentParkingLots] = useState<ParkingLot[]>([])

  const toggleChip = () => {
    setChipSelected(!chipSelected)
  }

  const expandParkingDetailsSheet = () => {
    bottomSheetRef.current?.expand()
  }

  const handleParkingCardPress = (parking: ParkingLot) => {
    console.log('parking pressed', parking)
    setCurrentParking(parking)
    expandParkingDetailsSheet()
  }

  const openMapDirection = async () => {
    const currentLat = deviceLocation?.[1]
    const currentLon = deviceLocation?.[0]
    const destinationLat = 8.7985081
    const destinationLon = -75.7149219

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
    const url = 'tel:1234567890'
    try {
      await Linking.openURL(url)
    } catch (err) {
      Alert.alert('Error', 'Algo salió mal al intentar hacer la llamada')
      console.error(err)
    }
  }

  const [isReportModalOpen, setIsReportModalOpen] = useState(false)

  const hideReportModal = () => {
    setIsReportModalOpen(false)
  }

  const showReportModal = () => {
    setIsReportModalOpen(true)
  }

  const handleSearchBarPress = () => {
    router.push('/home/search')
  }

  const login = async () => {
    const userUuid = await AsyncStorage.getItem('userUuid')
    const result = await MeParqueoApi.post<LoginResponse>(
      '/api/v1/auth/client',
      {
        clientId: userUuid,
      },
    )

    await AsyncStorage.setItem('userToken', result.data.data.token)
    await socketManager.updateToken(result.data.data.token)
  }

  const checkUserUuid = async () => {
    const userUuid = await AsyncStorage.getItem('userUuid')
    if (!userUuid) {
      await AsyncStorage.setItem('userUuid', uuidv4())
    }

    login()
    //loadRecentParkingLots()
  }

  // const loadRecentParkingLots = async () => {
  //   try {
  //     const response = await MeParqueoApi.get<PaginationResponse>(
  //       `/api/v1/user/recently/stored/parkings?limit=10&page=1`,
  //     )
  //     console.log('paginación ', response.data.data.data)
  //   } catch (error) {
  //     console.log('error en la paginacion', error)
  //   }
  // }

  useEffect(() => {
    checkUserUuid()
  }, [])

  return {
    chipSelected,
    toggleChip,
    handleParkingCardPress,
    openMapDirection,
    callParkingLot,
    isReportModalOpen,
    hideReportModal,
    showReportModal,
    handleSearchBarPress,
    bottomSheetRef,
    currentParking,
    setCurrentParking,
  }
}
