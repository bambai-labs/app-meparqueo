import { ButtonText } from '@/components/ui/button'
import { HStack } from '@/components/ui/hstack'
import { VStack } from '@/components/ui/vstack'
import { Chip, ScreenWrapper } from '@/modules/common'
import { Stack } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {
  ParkingDetailsSheet,
  RecentParkingsList,
  ReportModal,
  SearchBar,
} from '../components'
import { useHome } from '../hooks'

export const HomeScreen = () => {
  const {
    isReportModalOpen,
    bottomSheetRef,
    currentParking,
    loading,
    query,
    places,
    isFocused,
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
  } = useHome()

  return (
    <GestureHandlerRootView>
      <ScreenWrapper className="bg-white">
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />

        <VStack className="w-full">
          <VStack className="w-full">
            <SearchBar
              query={query}
              onQueryChange={handleQueryChange}
              placeholder="A donde quieres ir?"
              className="mt-3 bg-white rounded-lg"
              onSearch={handleSearch}
              loading={loading}
              places={places}
              onPlacePress={handlePlacePress}
              onClear={handleClearQuery}
              isFocused={isFocused}
              setIsFocused={setIsFocused}
            />
          </VStack>
          <HStack space="md" className="w-full items-start mt-4">
            <Chip selected={false} onPress={handleViewAllParkingLots}>
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

        {currentParking && (
          <ReportModal
            parkingLot={currentParking}
            opened={isReportModalOpen}
            onCancel={hideReportModal}
            onConfirm={hideReportModal}
          />
        )}
      </ScreenWrapper>
    </GestureHandlerRootView>
  )
}
