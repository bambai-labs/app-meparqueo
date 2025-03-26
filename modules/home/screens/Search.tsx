import { MeParqueoApi, Place } from '@/api'
import { Box } from '@/components/ui/box'
import { Button, ButtonText } from '@/components/ui/button'
import { HStack } from '@/components/ui/hstack'
import { AlertCircleIcon, Icon, PhoneIcon } from '@/components/ui/icon'
import { Image as GluestackImage } from '@/components/ui/image'
import { VStack } from '@/components/ui/vstack'
import { useAppSelector } from '@/modules/common'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { Camera, MapView, MarkerView } from '@rnmapbox/maps'
import { isAxiosError } from 'axios'
import Constants from 'expo-constants'
import { Stack, useRouter } from 'expo-router'
import { ArrowLeft, ChevronDown, MapIcon, MapPin } from 'lucide-react-native'
import Carousel from 'pinar'
import React, { useRef, useState } from 'react'
import { Alert, Image, Linking, Platform, Text, View } from 'react-native'
import {
  FlatList,
  GestureHandlerRootView,
  Pressable,
} from 'react-native-gesture-handler'
import {
  AvailabilityIndicator,
  ParkingResultCard,
  ReportModal,
  SearchBar,
} from '../components'
import { useSearchParkingLots, useSearchPlaces } from '../hooks'
import { ParkingLot, ParkingLotAvailability } from '../types'
import { formatCurrency } from '../utils'

export const SearchScreen = () => {
  const router = useRouter()
  const cameraRef = useRef<Camera>(null)
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [currentParking, setCurrentParking] = useState<ParkingLot | undefined>(
    undefined,
  )

  const [reportModalOpen, setReportModalOpen] = useState(false)

  const openReportModal = () => {
    setReportModalOpen(true)
  }

  const closeReportModal = () => {
    setReportModalOpen(false)
  }

  const {
    query,
    places,
    loading,
    searchPlace,
    clearPlaces,
    clearQuery,
    onChangeQuery,
  } = useSearchPlaces()

  const {
    loading: parkingLoading,
    parkingLots,
    searchNearParkingLots,
  } = useSearchParkingLots()

  const [currentDestination, setCurrentDestination] = useState<Place | null>(
    null,
  )

  const { deviceLocation } = useAppSelector((state) => state.location)

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

  const goBack = () => {
    router.back()
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
    setTimeout(openBottomSheet, 1200)
  }

  const [isReportModalOpen, setIsReportModalOpen] = useState(false)

  const hideReportModal = () => {
    setIsReportModalOpen(false)
  }

  const showReportModal = () => {
    setIsReportModalOpen(true)
  }

  const handlePlacePress = async (place: Place) => {
    setCurrentDestination(place)
    setCameraPosition([place.location.longitude, place.location.latitude])
    searchNearParkingLots(place.location.latitude, place.location.longitude)
    saveDestination()
  }

  const saveDestination = async () => {
    try {
      await MeParqueoApi.post('/api/v1/user/search', {
        filter: {
          priceRange: [0, 10],
          services: ['CAR_WASH'],
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

  const setCameraPosition = (position: [number, number]) => {
    cameraRef.current?.setCamera({
      centerCoordinate: position,
      zoomLevel: 14,
      pitch: 45,
      heading: 0,
      animationDuration: 1000,
    })
  }

  return (
    <GestureHandlerRootView>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <VStack
        style={{
          paddingTop: Constants.statusBarHeight + 20,
        }}
        className="h-full w-full"
      >
        <VStack className="px-4">
          <Pressable onPress={goBack} className="mb-3">
            <Icon className="p-4" as={ArrowLeft} size="xl" />
          </Pressable>
          <SearchBar
            query={query}
            onQueryChange={onChangeQuery}
            placeholder="A donde quieres ir?"
            className="mt-3"
            onSearch={searchPlace}
            loading={loading}
          >
            {places.length > 0 && (
              <FlatList
                className="w-full"
                data={places}
                keyExtractor={(place) => place.displayName.text}
                renderItem={({ item }) => (
                  <Pressable onPress={() => handlePlacePress(item)}>
                    <HStack
                      className="items-center p-3 border-b border-gray-100"
                      space="md"
                    >
                      <Icon as={MapPin} size="md" />
                      <Text>{item.displayName.text}</Text>
                    </HStack>
                  </Pressable>
                )}
              />
            )}
          </SearchBar>

          <HStack className="mt-3 w-full items-center justify-between">
            <HStack space="md">
              <Button variant="outline" className="border-gray-400 rounded-lg">
                <ButtonText>Filtrar</ButtonText>
                <Icon as={ChevronDown} size="sm" />
              </Button>
              <Button variant="outline" className="border-gray-400 rounded-lg">
                <ButtonText>Ordenar</ButtonText>
                <Icon as={ChevronDown} size="sm" />
              </Button>
            </HStack>

            <Text>3 resultados</Text>
          </HStack>
        </VStack>

        <Box className="flex-1 mt-2 relative">
          <MapView
            style={{
              height: '100%',
              width: '100%',
            }}
            logoEnabled={false}
            onDidFinishLoadingStyle={() => {
              setCameraPosition(deviceLocation!)
              console.log('moving')
            }}
          >
            <Camera ref={cameraRef} />

            {parkingLots.map((parkingResult) => (
              <MarkerView
                key={parkingResult.name}
                coordinate={[parkingResult.longitude, parkingResult.latitude]}
              >
                <Pressable
                  onPress={() => handleParkingCardPress(parkingResult)}
                >
                  <VStack className="items-center">
                    <Image
                      source={require('@/assets/images/parking_spot.png')}
                      style={{
                        width: 40,
                        height: 40,
                      }}
                    />
                  </VStack>
                </Pressable>
              </MarkerView>
            ))}

            {deviceLocation && (
              <MarkerView coordinate={deviceLocation}>
                <Box className="p-3 bg-blue-500 rounded-full border-3 border-white" />
              </MarkerView>
            )}

            {currentDestination && (
              <MarkerView
                coordinate={[
                  currentDestination.location.longitude,
                  currentDestination.location.latitude,
                ]}
                allowOverlap={true} // Allow overlapping with other markers
              >
                <VStack className="items-center">
                  <Image
                    source={require('@/assets/images/pin_map.png')}
                    style={{
                      width: 50,
                      height: 55,
                    }}
                  />
                </VStack>
              </MarkerView>
            )}
          </MapView>

          <Box className="absolute bottom-5 right-0 w-full pl-2">
            <FlatList
              horizontal={true}
              ItemSeparatorComponent={() => <View className="w-2" />}
              data={parkingLots}
              renderItem={({ item }) => (
                <ParkingResultCard
                  parkingLot={item}
                  onPress={handleParkingCardPress}
                />
              )}
              keyExtractor={(item) => item.name}
            />
          </Box>
        </Box>

        <BottomSheet
          ref={bottomSheetRef}
          enablePanDownToClose={true}
          index={-1}
          snapPoints={['50%', '80%']}
        >
          <BottomSheetView className="px-6">
            <Box className="h-96 rounded-2xl overflow-hidden">
              {currentParking && (
                <Carousel
                  autoplay
                  autoplayInterval={5000}
                  loop
                  showsControls={true}
                  showsDots
                >
                  {currentParking.imageUrls.map((imageUri, index) => (
                    <View key={index} className="w-full">
                      <GluestackImage
                        size="full"
                        source={{ uri: imageUri }}
                        alt={`Slide ${index + 1}`}
                      />
                    </View>
                  ))}
                </Carousel>
              )}
            </Box>

            <Text className="mt-4 text-3xl font-bold">
              {currentParking?.name}
            </Text>
            <HStack className="items-center">
              <Text className="text-xl">
                {formatCurrency(currentParking?.price ?? 0)}
              </Text>
              <Text className="text-gray-600"> / hora</Text>
            </HStack>

            <AvailabilityIndicator
              className="mt-2"
              availability={
                currentParking?.availability ??
                ParkingLotAvailability.NO_AVAILABILITY
              }
            />

            <HStack className="w-full justify-evenly mt-3">
              <VStack className="items-center">
                <Button
                  onPress={callParkingLot}
                  size="xl"
                  className="w-16 h-16 rounded-xl"
                >
                  <Icon as={PhoneIcon} size="xl" color="white" />
                </Button>
                <Text className="mt-2 text-gray-600">Llamar</Text>
              </VStack>

              <VStack className="items-center">
                <Button
                  onPress={openMapDirection}
                  size="xl"
                  className="w-16 h-16 rounded-xl"
                >
                  <Icon as={MapIcon} size="xl" color="white" />
                </Button>
                <Text className="mt-2 text-gray-600">Trazar ruta</Text>
              </VStack>

              <VStack className="items-center">
                <Button
                  onPress={showReportModal}
                  size="xl"
                  className="w-16 h-16 rounded-xl"
                >
                  <Icon as={AlertCircleIcon} size="xl" color="white" />
                </Button>
                <Text className="mt-2 text-gray-600">Reportar</Text>
              </VStack>
            </HStack>

            <Text className="mt-3 text-xl font-bold">
              Servicios adicionales
            </Text>

            <HStack>
              {currentParking?.services.map((service) => (
                <Text className="text-gray-600 text-xl">{service}</Text>
              ))}
            </HStack>

            <Text className="mt-3 text-xl font-bold">Métodos de pago</Text>

            <Text className="text-gray-600 text-xl">
              {currentParking?.paymentMethods.map((payment) => (
                <Text className="text-gray-600 text-xl">{payment}</Text>
              ))}
            </Text>
          </BottomSheetView>
        </BottomSheet>

        <ReportModal
          opened={isReportModalOpen}
          onCancel={hideReportModal}
          onConfirm={hideReportModal}
        />
      </VStack>
    </GestureHandlerRootView>
  )
}
