import { MeParqueoApi, Place } from '@/api'
import { ButtonText } from '@/components/ui/button'
import { HStack } from '@/components/ui/hstack'
import { VStack } from '@/components/ui/vstack'
import { Chip, ScreenWrapper } from '@/modules/common'
import { isAxiosError } from 'axios'
import { Stack, useRouter } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {
  ParkingDetailsSheet,
  RecentParkingsList,
  ReportModal,
  SearchBar,
} from '../components'
import { useHome, useSearchPlaces } from '../hooks'

export const HomeScreen = () => {
  const {
    bottomSheetRef,
    callParkingLot,
    currentParking,
    handleParkingCardPress,
    hideReportModal,
    isReportModalOpen,
    openMapDirection,
    showReportModal,
  } = useHome()

  const { query, places, loading, searchPlace, onChangeQuery } =
    useSearchPlaces()

  const handlePlacePress = async (place: Place) => {
    saveDestination(place)
    router.push({
      pathname: '/home/search',
      params: {
        place: JSON.stringify(place),
      },
    })
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

  const router = useRouter()

  return (
    <GestureHandlerRootView>
      <ScreenWrapper>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />

        <VStack>
          <SearchBar
            query={query}
            onQueryChange={onChangeQuery}
            placeholder="A donde quieres ir?"
            className="mt-3"
            onSearch={searchPlace}
            loading={loading}
            places={places}
            onPlacePress={handlePlacePress}
          />

          <HStack space="md" className="w-full items-start mt-4">
            <Chip
              selected={false}
              onPress={() => router.push('/home/allparkinglots')}
            >
              <ButtonText style={{ fontFamily: 'Neuwelt-Light' }}>
                Ver todos los parqueaderos
              </ButtonText>
            </Chip>
          </HStack>

          <RecentParkingsList onCardPress={handleParkingCardPress} />
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
