import { Button, ButtonText } from '@/components/ui/button'
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control'
import { Heading } from '@/components/ui/heading'
import { HStack } from '@/components/ui/hstack'
import { VStack } from '@/components/ui/vstack'
import { ScreenWrapper } from '@/modules/common'
import { Stack } from 'expo-router'
import { GestureHandlerRootView, Switch } from 'react-native-gesture-handler'
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
    radiusMt,
    onlyAvailable,
    paymentTransfer,
    valetParking,
    twentyFourSeven,
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
    handleRadiusMtChange,
    handleOnlyAvailableChange,
    handleOnlyPaymentTransferChange,
    handleWithValetParkingChange,
    handleWithTwentyFourSevenChange,
  } = useHome()

  return (
    <GestureHandlerRootView>
      <ScreenWrapper className="bg-white pb-20">
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

          <FormControl className="w-full">
            <Heading className="text-2xl mt-4 mb-2">Filtros</Heading>
            <VStack
              className="w-full space-y-4 shadow-2xl bg-white p-3 rounded-2xl"
              space="md"
            >
              <HStack className="w-full justify-between">
                <FormControlLabel>
                  <FormControlLabelText style={{ fontFamily: 'Neuwelt-Light' }}>
                    Solo parqueaderos disponibles
                  </FormControlLabelText>
                </FormControlLabel>
                <Switch
                  value={onlyAvailable}
                  onValueChange={handleOnlyAvailableChange}
                />
              </HStack>

              <HStack className="w-full justify-between">
                <FormControlLabel>
                  <FormControlLabelText style={{ fontFamily: 'Neuwelt-Light' }}>
                    Acepta pagos por transferencia
                  </FormControlLabelText>
                </FormControlLabel>
                <Switch
                  value={paymentTransfer}
                  onValueChange={handleOnlyPaymentTransferChange}
                />
              </HStack>

              <HStack className="w-full justify-between">
                <FormControlLabel>
                  <FormControlLabelText style={{ fontFamily: 'Neuwelt-Light' }}>
                    Valet parking
                  </FormControlLabelText>
                </FormControlLabel>
                <Switch
                  value={valetParking}
                  onValueChange={handleWithValetParkingChange}
                />
              </HStack>

              <HStack className="w-full justify-between">
                <FormControlLabel>
                  <FormControlLabelText style={{ fontFamily: 'Neuwelt-Light' }}>
                    Servicio 24/7
                  </FormControlLabelText>
                </FormControlLabel>
                <Switch
                  value={twentyFourSeven}
                  onValueChange={handleWithTwentyFourSevenChange}
                />
              </HStack>

              <FormControlLabel>
                <FormControlLabelText style={{ fontFamily: 'Neuwelt-Light' }}>
                  Radio: {radiusMt} m
                </FormControlLabelText>
              </FormControlLabel>

              <HStack space="md" className="mt-2 px-2">
                <Button
                  variant={radiusMt === 100 ? 'solid' : 'outline'}
                  onPress={() => handleRadiusMtChange(100)}
                  size="sm"
                  action="primary"
                  className="flex-1"
                >
                  <ButtonText>100m</ButtonText>
                </Button>
                <Button
                  variant={radiusMt === 200 ? 'solid' : 'outline'}
                  onPress={() => handleRadiusMtChange(200)}
                  size="sm"
                  action="primary"
                  className="flex-1"
                >
                  <ButtonText>200m</ButtonText>
                </Button>
                <Button
                  variant={radiusMt === 300 ? 'solid' : 'outline'}
                  onPress={() => handleRadiusMtChange(300)}
                  size="sm"
                  action="primary"
                  className="flex-1"
                >
                  <ButtonText>300m</ButtonText>
                </Button>
              </HStack>
            </VStack>
          </FormControl>

          <Button
            className="mt-4 bg-white shadow-xl"
            onPress={handleViewAllParkingLots}
            variant="outline"
          >
            <ButtonText style={{ fontFamily: 'Neuwelt-Light' }}>
              Ver todos los parqueaderos
            </ButtonText>
          </Button>

          <Heading className="text-2xl mt-4">Parqueaderos recientes</Heading>

          <RecentParkingsList
            className="mt-2"
            onCardPress={handleParkingCardPress}
          />
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
