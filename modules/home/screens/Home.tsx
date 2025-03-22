import { Box } from '@/components/ui/box'
import { Button, ButtonText } from '@/components/ui/button'
import { HStack } from '@/components/ui/hstack'
import {
  AlertCircleIcon,
  ArrowRightIcon,
  Icon,
  PhoneIcon,
} from '@/components/ui/icon'
import { Image as GluestackImage } from '@/components/ui/image'
import { Input, InputField } from '@/components/ui/input'
import { VStack } from '@/components/ui/vstack'
import { Chip, ScreenWrapper } from '@/modules/common'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import Constants from 'expo-constants'
import { Stack } from 'expo-router'
import { MapIcon } from 'lucide-react-native'
import Carousel from 'pinar'
import { useRef, useState } from 'react'
import { FlatList, Image, Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { AvailabilityIndicator, RecentParkingCard } from '../components'
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
    images: [],
    latitude: -75.7149219,
    longitude: 8.7990835,
    name: 'Parking Splash',
    paymentMethods: [],
    phoneNumber: '+1234567890',
    price: 2500,
    services: [],
    timestamp: new Date().getTime(),
  },
]

const carouselImages = [
  'https://eltesoro.com.co/wp-content/uploads/2021/04/0721-servicio-parqueadero-el-tesoro-%E2%80%93-2.jpeg',
  'https://files.lafm.com.co/assets/public/styles/img_node_706x392/public/2024-07/centro_comercial_centro_mayore.jpg.webp?VersionId=uk89CveRHtgxj2HPIofK.qczrJYkEkCT&itok=VYD9KsaQ',
  'https://bogota.gov.co/sites/default/files/2023-01/parqueadero.jpg',
]

export const HomeScreen = () => {
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
          <HStack>
            <Input
              style={{
                borderEndStartRadius: 0,
                borderEndEndRadius: 0,
                borderStartStartRadius: 8,
                borderStartEndRadius: 8,
              }}
              className="flex-1"
              variant="outline"
              size="xl"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
            >
              <InputField placeholder="A que dirección quieres ir?" />
            </Input>

            <Button
              size="xl"
              style={{
                borderStartStartRadius: 0,
                borderStartEndRadius: 0,
                borderEndStartRadius: 8,
                borderEndEndRadius: 8,
              }}
            >
              <Icon as={ArrowRightIcon} size="md" color="white" />
            </Button>
          </HStack>

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
          <BottomSheetView className="px-4">
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

            <HStack className="w-full justify-evenly">
              <Button size="xl">
                <Icon as={PhoneIcon} size="md" color="white" />
              </Button>

              <Button size="xl">
                <Icon as={MapIcon} size="md" color="white" />
              </Button>

              <Button size="xl">
                <Icon as={AlertCircleIcon} size="md" color="white" />
              </Button>
            </HStack>
          </BottomSheetView>
        </BottomSheet>
      </ScreenWrapper>
    </GestureHandlerRootView>
  )
}
