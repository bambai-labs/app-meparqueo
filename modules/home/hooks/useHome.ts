import { MeParqueoApi, Place, socketManager } from '@/api'
import { LoginResponse } from '@/api/responses/LoginResponse'
import { useAppDispatch, useAppSelector } from '@/modules/common'
import { AuthStatus } from '@/store/auth/auth-status.enum'
import { setAuthStatus } from '@/store/auth/authSlice'
import {
  onChangeQuery,
  setOnlyAvailable,
  setOnlyPaymentTransfer,
  setRadiusMt,
  setWithTwentyFourSeven,
  setWithValetParking,
} from '@/store/search/searchSlice'
import { searchPlace } from '@/store/search/thunks'
import BottomSheet from '@gorhom/bottom-sheet'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { isAxiosError } from 'axios'
import { usePathname, useRouter } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import { Alert, Linking, Platform } from 'react-native'
import { v4 as uuidv4 } from 'uuid'
import { ParkingLot } from '../types'

const HAS_SEEN_ACCORDION_ANIMATION_KEY = '@has_seen_accordion_animation'

export const useHome = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { deviceLocation } = useAppSelector((state) => state.location)
  const {
    radiusMt,
    onlyAvailable,
    paymentTransfer,
    valetParking,
    twentyFourSeven,
  } = useAppSelector((state) => state.search)
  const [chipSelected, setChipSelected] = useState(false)
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [currentParking, setCurrentParking] = useState<ParkingLot | undefined>(
    undefined,
  )
  const [accordionValue, setAccordionValue] = useState<string[]>([])

  const { loading, query, places } = useAppSelector((state) => state.search)
  const [isFocused, setIsFocused] = useState(false)
  const pathName = usePathname()

  useEffect(() => {
    const checkAndShowAnimation = async () => {
      try {
        const hasSeenAnimation = await AsyncStorage.getItem(
          HAS_SEEN_ACCORDION_ANIMATION_KEY,
        )

        if (!hasSeenAnimation) {
          const timer = setTimeout(() => {
            setAccordionValue(['a'])
            setTimeout(async () => {
              setAccordionValue([])
              await AsyncStorage.setItem(
                HAS_SEEN_ACCORDION_ANIMATION_KEY,
                'true',
              )
            }, 1500)
          }, 1000)

          return () => clearTimeout(timer)
        }
      } catch (error) {
        console.error('Error al verificar el estado de la animación:', error)
      }
    }

    checkAndShowAnimation()
  }, [])

  const handlePlacePress = async (place: Place) => {
    const shouldNavigate = pathName === '/home'

    saveDestination(place)
    setIsFocused(false)
    if (shouldNavigate) {
      router.push({
        pathname: '/home/search',
        params: {
          place: JSON.stringify(place),
        },
      })
    }
  }

  const saveDestination = async (destination: Place) => {
    try {
      await MeParqueoApi.post('/api/v1/user/search', {
        filter: {
          availability: [],
          services: [],
          paymentMethods: [],
        },
        destinationLocation: {
          latitude: destination.location.latitude,
          longitude: destination.location.longitude,
          searchTerm: query,
        },
      })

      console.log('destination saved')
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response)
        return
      }

      console.log(error)
    }
  }

  const handleQueryChange = (query: string) => {
    dispatch(onChangeQuery(query))
  }

  const handleClearQuery = () => {
    dispatch(onChangeQuery(''))
  }

  const handleSearch = (placeName: string) => {
    dispatch(searchPlace(placeName))
  }

  const toggleChip = () => {
    setChipSelected(!chipSelected)
  }

  const expandParkingDetailsSheet = () => {
    bottomSheetRef.current?.expand()
  }

  const handleParkingCardPress = (parking: ParkingLot) => {
    setCurrentParking(parking)
    setTimeout(() => {
      expandParkingDetailsSheet()
    }, 100)
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

  const [isReportModalOpen, setIsReportModalOpen] = useState(false)

  const hideReportModal = () => {
    setIsReportModalOpen(false)
  }

  const showReportModal = () => {
    setIsReportModalOpen(true)
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
    dispatch(setAuthStatus(AuthStatus.AUTHENTICATED))
  }

  const checkUserUuid = async () => {
    const userUuid = await AsyncStorage.getItem('userUuid')
    if (!userUuid) {
      await AsyncStorage.setItem('userUuid', uuidv4())
    }

    login()
  }

  const handleViewAllParkingLots = () => {
    router.push('/home/allparkinglots')
  }

  const handleRadiusMtChange = (value: number) => {
    dispatch(setRadiusMt(value))
  }

  const handleOnlyAvailableChange = (value: boolean) => {
    dispatch(setOnlyAvailable(value))
  }

  const handleOnlyPaymentTransferChange = (value: boolean) => {
    dispatch(setOnlyPaymentTransfer(value))
  }

  const handleWithValetParkingChange = (value: boolean) => {
    dispatch(setWithValetParking(value))
  }

  const handleWithTwentyFourSevenChange = (value: boolean) => {
    dispatch(setWithTwentyFourSeven(value))
  }

  useEffect(() => {
    if (places.length === 0) {
      return
    }
    const firstPlace = places[0]
    handlePlacePress(firstPlace)
  }, [places])

  useEffect(() => {
    checkUserUuid()
  }, [])

  return {
    isReportModalOpen,
    bottomSheetRef,
    currentParking,
    loading,
    query,
    places,
    isFocused,
    radiusMt,
    onlyAvailable,
    paymentTransfer,
    valetParking,
    twentyFourSeven,
    accordionValue,
    setAccordionValue,
    handleViewAllParkingLots,
    handleParkingCardPress,
    openMapDirection,
    callParkingLot,
    setIsFocused,
    handleQueryChange,
    handleClearQuery,
    handleSearch,
    handlePlacePress,
    hideReportModal,
    showReportModal,
    handleRadiusMtChange,
    handleOnlyAvailableChange,
    handleOnlyPaymentTransferChange,
    handleWithValetParkingChange,
    handleWithTwentyFourSevenChange,
  }
}
