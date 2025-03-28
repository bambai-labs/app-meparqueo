import { Box } from '@/components/ui/box'
import { ButtonText } from '@/components/ui/button'
import { VStack } from '@/components/ui/vstack'
import { Chip, ScreenWrapper } from '@/modules/common'
import Constants from 'expo-constants'
import { Stack } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {
  EmptyRecentsParkingsImage,
  ParkingDetailsSheet,
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

const recentParkings: RecentParkingLot[] = [
  {
    id: '1',
    availability: ParkingLotAvailability.MORE_THAN_FIVE,
    status: ParkingStatus.OPEN,
    imageUrls: [
      'https://eltesoro.com.co/wp-content/uploads/2021/04/0721-servicio-parqueadero-el-tesoro-%E2%80%93-2.jpeg',
      'https://files.lafm.com.co/assets/public/styles/img_node_706x392/public/2024-07/centro_comercial_centro_mayore.jpg.webp?VersionId=uk89CveRHtgxj2HPIofK.qczrJYkEkCT&itok=VYD9KsaQ',
      'https://bogota.gov.co/sites/default/files/2023-01/parqueadero.jpg',
    ],
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

        {currentParking && (
          <ParkingDetailsSheet
            ref={bottomSheetRef}
            parkingLot={currentParking}
            onCallParkingLot={callParkingLot}
            onOpenMapDirection={openMapDirection}
            onShowReportModal={showReportModal}
          />
        )}

        <ReportModal
          opened={isReportModalOpen}
          onCancel={hideReportModal}
          onConfirm={hideReportModal}
        />
      </ScreenWrapper>
    </GestureHandlerRootView>
  )
}
