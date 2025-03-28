import { Box } from '@/components/ui/box'
import { Button, ButtonText } from '@/components/ui/button'
import { HStack } from '@/components/ui/hstack'
import { AlertCircleIcon, Icon, PhoneIcon } from '@/components/ui/icon'
import { Image as GluestackImage } from '@/components/ui/image'
import { VStack } from '@/components/ui/vstack'
import { Chip, ScreenWrapper } from '@/modules/common'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import Constants from 'expo-constants'
import { Stack } from 'expo-router'
import { MapIcon } from 'lucide-react-native'
import Carousel from 'pinar'
import { Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {
  AvailabilityIndicator,
  EmptyRecentsParkingsImage,
  RecentPakingsList,
  ReportModal,
  SearchBar,
} from '../components'
import { useHome } from '../hooks'
import {
  ParkingLotAvailability,
  ParkingStatus,
  RecentParkingLot,
} from '../types'
import { formatCurrency } from '../utils'

const recentParkings: RecentParkingLot[] = [
  {
    id: '1',
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
  const {
    bottomSheetRef,
    callParkingLot,
    chipSelected,
    currentParking,
    handleParkingCardPress,
    handleSearchBarPress,
    hideReportModal,
    isReportModalOpen,
    openMapDirection,
    showReportModal,
    toggleChip,
  } = useHome()

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
            <RecentPakingsList
              onCardPress={handleParkingCardPress}
              recentParkings={recentParkings}
            />
          ) : (
            <EmptyRecentsParkingsImage />
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

        <ReportModal
          opened={isReportModalOpen}
          onCancel={hideReportModal}
          onConfirm={hideReportModal}
        />
      </ScreenWrapper>
    </GestureHandlerRootView>
  )
}
