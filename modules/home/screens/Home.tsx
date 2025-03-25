import { MeParqueoApi } from '@/api'
import { LoginResponse } from '@/api/responses/LoginResponse'
import { Box } from '@/components/ui/box'
import { Button, ButtonText } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { HStack } from '@/components/ui/hstack'
import {
  AlertCircleIcon,
  ChevronDownIcon,
  CloseIcon,
  Icon,
  PhoneIcon,
} from '@/components/ui/icon'
import { Image as GluestackImage } from '@/components/ui/image'
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/components/ui/modal'
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from '@/components/ui/select'
import { Textarea, TextareaInput } from '@/components/ui/textarea'
import { VStack } from '@/components/ui/vstack'
import { Chip, ScreenWrapper } from '@/modules/common'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'
import { Stack, useRouter } from 'expo-router'
import { MapIcon } from 'lucide-react-native'
import Carousel from 'pinar'
import { useEffect, useRef, useState } from 'react'
import {
  Alert,
  FlatList,
  Image,
  Linking,
  Platform,
  Text,
  View,
} from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { v4 as uuidv4 } from 'uuid'
import {
  AvailabilityIndicator,
  RecentParkingCard,
  SearchBar,
} from '../components'
import {
  ParkingLot,
  ParkingLotAvailability,
  ParkingStatus,
  RecentParkingLot,
} from '../types'
import { formatCurrency } from '../utils'

const recentParkings: RecentParkingLot[] = [
  {
    availability: ParkingLotAvailability.MORE_THAN_FIVE,
    status: ParkingStatus.OPEN,
    imageUrls: [],
    latitude: -75.7149219,
    longitude: 8.7990835,
    name: 'Parking Splash',
    paymentMethods: [],
    phoneNumber: '+1234567890',
    price: 2500,
    services: [],
    timestamp: new Date().getTime(),
    distanceKm: 78,
  },
]

const carouselImages = [
  'https://eltesoro.com.co/wp-content/uploads/2021/04/0721-servicio-parqueadero-el-tesoro-%E2%80%93-2.jpeg',
  'https://files.lafm.com.co/assets/public/styles/img_node_706x392/public/2024-07/centro_comercial_centro_mayore.jpg.webp?VersionId=uk89CveRHtgxj2HPIofK.qczrJYkEkCT&itok=VYD9KsaQ',
  'https://bogota.gov.co/sites/default/files/2023-01/parqueadero.jpg',
]

export const HomeScreen = () => {
  const router = useRouter()
  const [chipSelected, setChipSelected] = useState(false)
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [currentParking, setCurrentParking] = useState<ParkingLot | undefined>(
    undefined,
  )

  const toggleChip = () => {
    setChipSelected(!chipSelected)
  }

  const expandParkingDetailsSheet = () => {
    bottomSheetRef.current?.expand()
  }

  const handleParkingCardPress = (parking: ParkingLot) => {
    setCurrentParking(parking)
    expandParkingDetailsSheet()
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
  }

  const checkUserUuid = async () => {
    //Retrieve user uuid
    const userUuid = await AsyncStorage.getItem('userUuid')
    if (!userUuid) {
      await AsyncStorage.setItem('userUuid', uuidv4())
    }

    login()
  }

  useEffect(() => {
    checkUserUuid()
  }, [])

  return (
    <GestureHandlerRootView>
      <ScreenWrapper>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />

        <VStack
          style={{
            paddingTop: Constants.statusBarHeight + 20,
          }}
        >
          <SearchBar
            query=""
            onQueryChange={() => {}}
            readonly={true}
            onPress={handleSearchBarPress}
            pointerEvents="none"
            placeholder="A donde quieres ir?"
            onSearch={() => {}}
          />

          <Box className="w-full items-start mt-6">
            <Chip selected={chipSelected} onPress={toggleChip}>
              <ButtonText>Recientes</ButtonText>
            </Chip>
          </Box>

          {chipSelected ? (
            <FlatList
              className="mt-5"
              data={recentParkings}
              renderItem={({ item }) => (
                <RecentParkingCard
                  recentParking={item}
                  onPress={handleParkingCardPress}
                />
              )}
              keyExtractor={(item) => item.name}
            />
          ) : (
            <VStack className="h-[80%] flex-col justify-center items-center">
              <Image source={require('@/assets/images/parking.png')} />
              <View>
                <Text className="font-bold text-2xl text-center">
                  Comienza tu experiencia con Me Parqueo. Busca tu destino 👆
                </Text>
              </View>
            </VStack>
          )}
        </VStack>

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

        <Modal isOpen={isReportModalOpen} onClose={hideReportModal}>
          <ModalBackdrop />

          <ModalContent>
            <ModalHeader>
              <Heading>Reportar parqueadero</Heading>
              <ModalCloseButton>
                <Icon
                  as={CloseIcon}
                  size="md"
                  className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
                />
              </ModalCloseButton>
            </ModalHeader>

            <ModalBody>
              <Select className="w-full">
                <SelectTrigger variant="outline" size="md">
                  <SelectInput
                    placeholder="Razón del reporte"
                    className="flex-1"
                  />
                  <SelectIcon className="mr-3" as={ChevronDownIcon} />
                </SelectTrigger>
                <SelectPortal>
                  <SelectBackdrop />
                  <SelectContent>
                    <SelectDragIndicatorWrapper>
                      <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                    <SelectItem label="Mala atención" value="ma" />
                    <SelectItem
                      label="No era la disponibilidad correcta"
                      value="nd"
                    />
                    <SelectItem
                      label="Otro"
                      value="Cross Platform Development Process"
                    />
                  </SelectContent>
                </SelectPortal>
              </Select>

              <Textarea size="md" className="mt-3">
                <TextareaInput placeholder="Comentarios" />
              </Textarea>
            </ModalBody>

            <ModalFooter>
              <Button
                variant="outline"
                action="secondary"
                onPress={hideReportModal}
              >
                <ButtonText>Cancelar</ButtonText>
              </Button>
              <Button onPress={hideReportModal}>
                <ButtonText>Reportar</ButtonText>
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </ScreenWrapper>
    </GestureHandlerRootView>
  )
}
