import { MeParqueoApi, Place } from '@/api'
import { Box } from '@/components/ui/box'
import { Button, ButtonText } from '@/components/ui/button'
import { HStack } from '@/components/ui/hstack'
import { Icon } from '@/components/ui/icon'
import { VStack } from '@/components/ui/vstack'
import { useAppDispatch, useAppSelector } from '@/modules/common'
import { onChangeQuery, searchPlace } from '@/store'
import BottomSheet from '@gorhom/bottom-sheet'
import { Camera } from '@rnmapbox/maps'
import { isAxiosError } from 'axios'
import { Stack, useLocalSearchParams } from 'expo-router'
import { useFormik } from 'formik'
import { ChevronDown } from 'lucide-react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, Linking, Platform, Text } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {
  FilterModal,
  ParkingDetailsSheet,
  ParkingLotsMap,
  ParkingResultCard,
  ReportModal,
  SearchBar,
} from '../components'
import { useSearchParkingLots } from '../hooks'
import { FilterModalValues, ParkingLot } from '../types'

export const SearchScreen = () => {
  const { place } = useLocalSearchParams()
  const cameraRef = useRef<Camera>(null)
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [currentParking, setCurrentParking] = useState<ParkingLot | undefined>(
    undefined,
  )
  const [mapLoaded, setMapLoaded] = useState(false)

  const [reportModalOpen, setReportModalOpen] = useState(false)

  const [isFocused, setIsFocused] = useState(false)

  const openReportModal = () => {
    setReportModalOpen(true)
  }

  const closeReportModal = () => {
    setReportModalOpen(false)
  }

  const {
    loading: parkingLoading,
    parkingLots,
    searchNearParkingLots,
  } = useSearchParkingLots()

  const [currentDestination, setCurrentDestination] = useState<Place | null>(
    null,
  )

  const { deviceLocation } = useAppSelector((state) => state.location)
  const { places, query, loading } = useAppSelector((state) => state.search)
  const dispatch = useAppDispatch()

  const handleQueryChange = (query: string) => {
    dispatch(onChangeQuery(query))
  }

  const handleClearQuery = () => {
    dispatch(onChangeQuery(''))
  }

  const handleSearch = (placeName: string) => {
    dispatch(searchPlace(placeName))
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
    saveRecentParking()
  }

  const saveRecentParking = async () => {
    try {
      await MeParqueoApi.post('/api/v1/user/recently-parked', {
        parkingLotId: currentParking?.id,
        destinationLocation: {
          latitude: currentDestination?.location.latitude,
          longitude: currentDestination?.location.longitude,
          searchTerm: query,
        },
        distanceKm: currentParking?.distanceKm,
      })

      console.log('Parking destination saved')
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response)
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

  const handleParkingCardPress = (parking: ParkingLot) => {
    setCurrentParking(parking)
    setCameraPosition([parking.longitude, parking.latitude])
    openBottomSheet()
  }

  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  const hideReportModal = () => {
    setIsReportModalOpen(false)
  }

  const showReportModal = () => {
    setIsReportModalOpen(true)
  }

  const showFilterModal = () => {
    setIsFilterModalOpen(true)
  }

  const hideFilterModal = () => {
    setIsFilterModalOpen(false)
  }

  const { values, handleSubmit, setFieldValue } = useFormik<FilterModalValues>({
    initialValues: {
      radiusKm: 5,
      onlyAvailable: false,
      paymentTransfer: false,
      valetParking: false,
      twentyFourSeven: false,
    },
    onSubmit: (values) => {
      console.log('values', values)
      handleConfirmFilterModal(values)
    },
  })

  const handleSwitchChange = (name: string) => (value: boolean) => {
    setFieldValue(name, value)
  }

  const handleConfirmFilterModal = (values: FilterModalValues) => {
    if (currentDestination) {
      searchNearParkingLots(
        currentDestination.location.latitude,
        currentDestination.location.longitude,
        values.radiusKm.toString(),
        values.onlyAvailable,
        values.paymentTransfer,
        values.valetParking,
        values.twentyFourSeven,
      )
    }

    hideFilterModal()
  }

  const handlePlacePress = async (place: Place) => {
    setCurrentDestination(place)
    setCameraPosition([place.location.longitude, place.location.latitude])
    searchNearParkingLots(
      place.location.latitude,
      place.location.longitude,
      values.radiusKm.toString(),
      values.onlyAvailable,
      values.paymentTransfer,
      values.valetParking,
      values.twentyFourSeven,
    )
    saveDestination()
  }

  const saveDestination = async () => {
    try {
      await MeParqueoApi.post('/api/v1/user/search', {
        filter: {
          availability: [],
          services: [],
          paymentMethods: [],
        },
        destinationLocation: {
          latitude: currentDestination?.location.latitude,
          longitude: currentDestination?.location.longitude,
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

  useEffect(() => {
    if (place && mapLoaded) {
      const placeFromParams = JSON.parse(place as string) as Place
      handlePlacePress(placeFromParams)
      searchNearParkingLots(
        placeFromParams.location.latitude,
        placeFromParams.location.longitude,
        values.radiusKm.toString(),
        values.onlyAvailable,
        values.paymentTransfer,
        values.valetParking,
        values.twentyFourSeven,
      )
    }
  }, [mapLoaded])

  useEffect(() => {
    if (places.length === 0) {
      return
    }
    const firstPlace = places[0]
    handlePlacePress(firstPlace)
  }, [places])

  return (
    <GestureHandlerRootView>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <VStack className="h-full w-full bg-white">
        <VStack className="px-4">
          <SearchBar
            places={places}
            query={query}
            onQueryChange={handleQueryChange}
            onClear={handleClearQuery}
            placeholder="A donde quieres ir?"
            className="mt-3"
            onSearch={handleSearch}
            loading={loading}
            onPlacePress={handlePlacePress}
            isFocused={isFocused}
            setIsFocused={setIsFocused}
          />

          <HStack className="mt-3 w-full items-center justify-between">
            <HStack space="md">
              <Button
                onPress={showFilterModal}
                variant="outline"
                className="border-gray-400 rounded-lg"
              >
                <ButtonText style={{ fontFamily: 'Neuwelt-Light' }}>
                  Filtrar
                </ButtonText>
                <Icon as={ChevronDown} size="sm" />
              </Button>
            </HStack>

            <Text style={{ fontFamily: 'Neuwelt-Light' }}>
              {parkingLots.length > 0 ? `${parkingLots.length} resultados` : ''}
            </Text>
          </HStack>
        </VStack>

        <Box className="flex-1 mt-2 relative">
          <ParkingLotsMap
            currentDestination={currentDestination}
            parkingLots={parkingLots}
            onFinishLoading={() => {
              setCameraPosition(deviceLocation!, false)
              setMapLoaded(true)
            }}
            onParkingMarkerPress={handleParkingMarkerPress}
            ref={cameraRef}
          />

          <Box className="absolute bottom-5 right-0 w-full px-2">
            {currentParking && (
              <ParkingResultCard
                parkingLot={currentParking}
                onPress={handleParkingCardPress}
              />
            )}
          </Box>
        </Box>

        {currentParking && (
          <ParkingDetailsSheet
            ref={bottomSheetRef}
            parkingLot={currentParking}
            onCallParkingLot={callParkingLot}
            onOpenMapDirection={openMapDirection}
            onShowReportModal={showReportModal}
          />
        )}

        {currentParking && (
          <ReportModal
            parkingLot={currentParking}
            opened={isReportModalOpen}
            onCancel={hideReportModal}
            onConfirm={hideReportModal}
          />
        )}

        <FilterModal
          values={values}
          handleSwitchChange={handleSwitchChange}
          handleSubmit={handleSubmit}
          opened={isFilterModalOpen}
          onCancel={hideFilterModal}
        />
      </VStack>
    </GestureHandlerRootView>
  )
}
