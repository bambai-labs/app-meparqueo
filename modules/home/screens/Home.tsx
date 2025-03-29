import { Box } from '@/components/ui/box'
import { ButtonText } from '@/components/ui/button'
import { VStack } from '@/components/ui/vstack'
import { Chip, ScreenWrapper } from '@/modules/common'
import Constants from 'expo-constants'
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

          <Box className="w-full items-start mt-6 bg-red-">
            <Chip selected={chipSelected} onPress={toggleChip}>
              <ButtonText>Recientes</ButtonText>
            </Chip>
          </Box>

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
