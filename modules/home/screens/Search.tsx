import { MeParqueoApi, Place } from '@/api'
import { Box } from '@/components/ui/box'
import { Button, ButtonText } from '@/components/ui/button'
import { HStack } from '@/components/ui/hstack'
import { Icon } from '@/components/ui/icon'
import { VStack } from '@/components/ui/vstack'
import { CITY_CENTER, useAppDispatch, useAppSelector } from '@/modules/common'
import { onChangeQuery, searchPlace, setIsSheetExpanded } from '@/store'
import BottomSheet from '@gorhom/bottom-sheet'
import { Camera } from '@rnmapbox/maps'
import { isAxiosError } from 'axios'
import { Stack, useLocalSearchParams } from 'expo-router'
import { useFormik } from 'formik'
import debounce from 'just-debounce-it'
import { ChevronDown } from 'lucide-react-native'
import Carousel from 'pinar'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, Linking, Platform, Text } from 'react-native'
import {
  FilterModal,
  ParkingDetailsSheet,
  ParkingLotsMap,
  ParkingResultCard,
  ParkingResultsList,
  ReportModal,
  SearchBar,
} from '../components'
import { useSearchParkingLots } from '../hooks'
import { FilterModalValues, ParkingLot } from '../types'

export const SearchScreen = () => {
  const { place } = useLocalSearchParams()
  const cameraRef = useRef<Camera>(null)
  const carouselRef = useRef<Carousel>(null)
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [currentParking, setCurrentParking] = useState<ParkingLot | undefined>(
    undefined,
  )
  const [mapLoaded, setMapLoaded] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const { parkingLots, searchNearParkingLots } = useSearchParkingLots()

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

  const handleSheetChange = (index: number) => {
    dispatch(setIsSheetExpanded(index > -1))
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
          latitude: currentDestination?.location.latitude,
          longitude: currentDestination?.location.longitude,
          searchTerm: query,
        },
        distanceMt: currentParking?.distanceMt,
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
      radiusMt: 300,
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
        values.radiusMt.toString(),
        values.onlyAvailable,
        values.paymentTransfer,
        values.valetParking,
        values.twentyFourSeven,
      )
      saveDestination()
    }

    hideFilterModal()
  }

  const handlePlacePress = async (place: Place) => {
    setCurrentDestination(place)
    setCameraPosition([place.location.longitude, place.location.latitude])
    searchNearParkingLots(
      place.location.latitude,
      place.location.longitude,
      values.radiusMt.toString(),
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
        filters: {
          ...values,
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
    zoomLevel: number = 17,
  ) => {
    cameraRef.current?.setCamera({
      centerCoordinate: position,
      zoomLevel,
      heading: 0,
      animationDuration: animated ? 1000 : 0,
    })
  }

  const handleParkingMarkerPress = (parkingLot: ParkingLot) => {
    setCurrentParking(parkingLot)
    setCameraPosition([parkingLot.longitude, parkingLot.latitude])
  }

  const handleOnParkingListScroll = (parkingLot: ParkingLot) => {
    handleParkingMarkerPress(parkingLot)
  }

  useEffect(() => {
    if (place && mapLoaded) {
      const placeFromParams = JSON.parse(place as string) as Place
      handlePlacePress(placeFromParams)
      searchNearParkingLots(
        placeFromParams.location.latitude,
        placeFromParams.location.longitude,
        values.radiusMt.toString(),
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
    <>
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
              setCameraPosition(CITY_CENTER, false, 14)
              setMapLoaded(true)
            }}
            onParkingMarkerPress={(parkingLot) => {
              handleParkingMarkerPress(parkingLot)
              carouselRef.current?.scrollToIndex({
                index: parkingLots.indexOf(parkingLot),
                animated: true,
              })
            }}
            ref={cameraRef}
          />

          <Box className="absolute bottom-5 right-0 w-full px-2">
            {parkingLots.length === 1 ? (
              currentParking && (
                <ParkingResultCard
                  parkingLot={currentParking}
                  onPress={handleParkingCardPress}
                />
              )
            ) : (
              <ParkingResultsList
                ref={carouselRef}
                parkingLots={parkingLots}
                onParkingLotPress={handleParkingCardPress}
                onScroll={debounce(handleOnParkingListScroll, 500)}
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
            onChange={handleSheetChange}
          />
        )}
      </VStack>

      <FilterModal
        values={values}
        handleSwitchChange={handleSwitchChange}
        handleSubmit={handleSubmit}
        opened={isFilterModalOpen}
        onCancel={hideFilterModal}
      />

      {currentParking && (
        <ReportModal
          parkingLot={currentParking}
          opened={isReportModalOpen}
          onCancel={hideReportModal}
          onConfirm={hideReportModal}
        />
      )}
    </>
  )
}
