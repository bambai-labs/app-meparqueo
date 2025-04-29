import { Box } from '@/components/ui/box'
import { VStack } from '@/components/ui/vstack'
import { Stack } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {
  ParkingDetailsSheet,
  ParkingLotsMap,
  ParkingResultCard,
  ReportModal,
} from '../components'
import { useAllParkingLots } from '../hooks'

export const AllParkingLotsScreen = () => {
  const {
    currentParking,
    cameraRef,
    bottomSheetRef,
    parkingLots,
    isReportModalOpen,
    handleMapFinishLoading,
    handleParkingMarkerPress,
    handleParkingCardPress,
    hideReportModal,
    showReportModal,
    callParkingLot,
    openMapDirection,
    handleSheetChange,
  } = useAllParkingLots()

  return (
    <GestureHandlerRootView>
      <VStack className="h-full w-full">
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />

        <ParkingLotsMap
          currentDestination={null}
          parkingLots={parkingLots}
          ref={cameraRef}
          onFinishLoading={handleMapFinishLoading}
          onParkingMarkerPress={handleParkingMarkerPress}
        />

        <Box className="absolute bottom-5 right-0 w-full px-2">
          {currentParking && (
            <ParkingResultCard
              parkingLot={currentParking}
              onPress={handleParkingCardPress}
            />
          )}
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

        {currentParking && (
          <ReportModal
            parkingLot={currentParking}
            opened={isReportModalOpen}
            onCancel={hideReportModal}
            onConfirm={hideReportModal}
          />
        )}
      </VStack>
    </GestureHandlerRootView>
  )
}
