import { Box } from '@/components/ui/box'
import { Button, ButtonText } from '@/components/ui/button'
import { HStack } from '@/components/ui/hstack'
import { AlertCircleIcon, Icon, PhoneIcon } from '@/components/ui/icon'
import { Image as GluestackImage } from '@/components/ui/image'
import { VStack } from '@/components/ui/vstack'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { Camera, MapView, MarkerView } from '@rnmapbox/maps'
import Constants from 'expo-constants'
import * as Location from 'expo-location'
import { Stack, useRouter } from 'expo-router'
import { ArrowLeft, ChevronDown, MapIcon } from 'lucide-react-native'
import Carousel from 'pinar'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, Linking, Platform, Text, View } from 'react-native'
import {
  FlatList,
  GestureHandlerRootView,
  Pressable,
} from 'react-native-gesture-handler'
import {
  AvailabilityIndicator,
  ParkingResultCard,
  SearchBar,
} from '../components'
import { ParkingLot, ParkingLotAvailability, ParkingStatus } from '../types'
import { formatCurrency } from '../utils'
import { getPermissions } from '../utils/locationUtils'

const carouselImages = [
  'https://eltesoro.com.co/wp-content/uploads/2021/04/0721-servicio-parqueadero-el-tesoro-%E2%80%93-2.jpeg',
  'https://files.lafm.com.co/assets/public/styles/img_node_706x392/public/2024-07/centro_comercial_centro_mayore.jpg.webp?VersionId=uk89CveRHtgxj2HPIofK.qczrJYkEkCT&itok=VYD9KsaQ',
  'https://bogota.gov.co/sites/default/files/2023-01/parqueadero.jpg',
]

const parkingResults: ParkingLot[] = [
  {
    availability: ParkingLotAvailability.MORE_THAN_FIVE,
    images: [],
    latitude: -75.861874,
    longitude: 8.785986,
    name: 'Parqueadero casa del pino',
    paymentMethods: [],
    phoneNumber: '+1234567890',
    price: 2500,
    services: [],
    status: ParkingStatus.OPEN,
  },
  {
    availability: ParkingLotAvailability.LESS_THAN_FIVE,
    images: [],
    latitude: -75.862803,
    longitude: 8.77373,
    name: 'Parqueadero de la castellana',
    paymentMethods: [],
    phoneNumber: '+1234567890',
    price: 3000,
    services: [],
    status: ParkingStatus.OPEN,
  },
]

export const SearchScreen = () => {
  const router = useRouter()
  const cameraRef = useRef<Camera>(null)
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [currentParking, setCurrentParking] = useState<ParkingLot | undefined>(
    undefined,
  )
  const [locationSubscription, setLocationSubscription] =
    useState<Location.LocationSubscription | null>(null)

  const [deviceLocation, setDeviceLocation] = useState<[number, number] | null>(
    null,
  )
  const [firstTimeLoaded, setFirstTimeLoaded] = useState(false)

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand()
  }

  const openMapDirection = async () => {
    //Los current se reemplazaran por la ubicación precisa del dispositivo
    const currentLat = 8.800618
    const currentLon = -75.7180332
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

  const goBack = () => {
    router.back()
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

  const handleParkingCardPress = (parking: ParkingLot) => {
    setCurrentParking(parking)
    setCameraPosition([parking.latitude, parking.longitude])
    setTimeout(openBottomSheet, 1200)
  }

  const [isReportModalOpen, setIsReportModalOpen] = useState(false)

  const hideReportModal = () => {
    setIsReportModalOpen(false)
  }

  const showReportModal = () => {
    setIsReportModalOpen(true)
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

  const startWatchingLocation = async () => {
    const hasPermission = await getPermissions()
    if (!hasPermission) return

    const sub = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      ({ coords }) => {
        const { longitude, latitude } = coords
        setDeviceLocation([longitude, latitude])
        if (!firstTimeLoaded) {
          setFirstTimeLoaded(true)
          setCameraPosition([longitude, latitude])
        }
      },
    )

    setLocationSubscription(sub)
  }

  const stopWatchingLocation = () => {
    locationSubscription?.remove()
    setLocationSubscription(null)
  }

  useEffect(() => {
    startWatchingLocation()

    return () => {
      stopWatchingLocation()
    }
  }, [])

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
        className="h-screen w-full"
      >
        <VStack className="px-4">
          <Pressable onPress={goBack} className="mb-3">
            <Icon className="p-4" as={ArrowLeft} size="xl" />
          </Pressable>
          <SearchBar className="mt-3" />

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
          >
            <Camera ref={cameraRef} />

            {parkingResults.map((parkingResult) => (
              <MarkerView
                key={parkingResult.name}
                coordinate={[parkingResult.latitude, parkingResult.longitude]}
              >
                <Pressable
                  onPress={() => handleParkingCardPress(parkingResult)}
                >
                  <Box className="p-3 bg-white rounded-full">
                    <Text>{parkingResult.name}</Text>
                  </Box>
                </Pressable>
              </MarkerView>
            ))}

            {deviceLocation && (
              <MarkerView coordinate={deviceLocation}>
                <Box className="p-3 bg-blue-500 rounded-full border-3 border-white" />
              </MarkerView>
            )}
          </MapView>

          <Box className="absolute bottom-5 right-0 w-full pl-2">
            <FlatList
              horizontal={true}
              ItemSeparatorComponent={() => <View className="w-2" />}
              data={parkingResults}
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
              <Carousel
                autoplay
                autoplayInterval={5000}
                loop
                showsControls={true}
                showsDots
              >
                {carouselImages.map((imageUri, index) => (
                  <View key={index} className="w-full">
                    <GluestackImage
                      size="full"
                      source={{ uri: imageUri }}
                      alt={`Slide ${index + 1}`}
                    />
                  </View>
                ))}
              </Carousel>
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

            <Text className="text-gray-600 text-xl">
              Lavadero, Camaras, Wifi, Llantería, Cambio de aceite
            </Text>

            <Text className="mt-3 text-xl font-bold">Métodos de pago</Text>

            <Text className="text-gray-600 text-xl">
              Efectivo, Nequi, Bancolombia a la mano, Datafono
            </Text>
          </BottomSheetView>
        </BottomSheet>
      </VStack>
    </GestureHandlerRootView>
  )
}
