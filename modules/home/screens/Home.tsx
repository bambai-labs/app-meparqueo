import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTitleText,
  AccordionTrigger,
} from '@/components/ui/accordion'
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
import { Filter } from 'lucide-react-native'
import React from 'react'
import { Animated, Easing, View } from 'react-native'
import { GestureHandlerRootView, Switch } from 'react-native-gesture-handler'
import {
  HomeBanner,
  ParkingDetailsSheet,
  RecentParkingsList,
  ReportSheet,
  SearchBar,
} from '../components'
import { useHome } from '../hooks'

export const HomeScreen = () => {
  const {
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
    accordionValue,
    reportSheetRef,
    setAccordionValue,
    handleViewAllParkingLots,
    handleParkingCardPress,
    openMapDirection,
    callParkingLot,
    setIsFocused,
    handleQueryChange,
    handleClearQuery,
    handleSearch,
    handlePlacePress,
    hideReportSheet,
    showReportSheet,
    handleRadiusMtChange,
    handleOnlyAvailableChange,
    handleOnlyPaymentTransferChange,
    handleWithValetParkingChange,
    handleWithTwentyFourSevenChange,
  } = useHome()

  return (
    <GestureHandlerRootView>
      <ScreenWrapper className="bg-white pb-3">
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />

        <VStack className="w-full flex-1">
          <VStack className="w-full">
            <SearchBar
              query={query}
              onQueryChange={handleQueryChange}
              placeholder="Escribe una zona o dirección"
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

          <Accordion
            size="md"
            variant="filled"
            type="single"
            isCollapsible={true}
            className="w-full"
            value={accordionValue}
            onValueChange={setAccordionValue}
          >
            <AccordionItem value="a">
              <AccordionHeader>
                <AccordionTrigger className="px-1">
                  {({ isExpanded }) => {
                    const [blinkAnim] = React.useState(new Animated.Value(1))
                    React.useEffect(() => {
                      const loop = Animated.loop(
                        Animated.sequence([
                          Animated.timing(blinkAnim, {
                            toValue: 0.2,
                            duration: 500,
                            easing: Easing.linear,
                            useNativeDriver: true,
                          }),
                          Animated.timing(blinkAnim, {
                            toValue: 1,
                            duration: 500,
                            easing: Easing.linear,
                            useNativeDriver: true,
                          }),
                        ]),
                      )
                      loop.start()
                      return () => loop.stop()
                    }, [])
                    return (
                      <>
                        <AccordionTitleText
                          style={{ fontFamily: 'Neuwelt-Bold' }}
                          className="text-xl text-gray-900 italic"
                        >
                          Filtra tu búsqueda
                        </AccordionTitleText>
                        <View
                          style={{
                            marginLeft: 12,
                            position: 'relative',
                            width: 24,
                            height: 24,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Filter size={24} color="#222" />
                          <Animated.View
                            style={{
                              position: 'absolute',
                              top: 0,
                              right: 0,
                              width: 8,
                              height: 8,
                              borderRadius: 4,
                              backgroundColor: '#2196f3',
                              opacity: blinkAnim,
                            }}
                          />
                        </View>
                      </>
                    )
                  }}
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionContent>
                <FormControl className="w-full">
                  <VStack
                    className="w-full space-y-4 shadow-2xl bg-white rounded-2xl"
                    space="md"
                  >
                    <HStack className="w-full justify-between">
                      <FormControlLabel>
                        <FormControlLabelText
                          style={{ fontFamily: 'Neuwelt-Light' }}
                        >
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
                        <FormControlLabelText
                          style={{ fontFamily: 'Neuwelt-Light' }}
                        >
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
                        <FormControlLabelText
                          style={{ fontFamily: 'Neuwelt-Light' }}
                        >
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
                        <FormControlLabelText
                          style={{ fontFamily: 'Neuwelt-Light' }}
                        >
                          Servicio 24/7
                        </FormControlLabelText>
                      </FormControlLabel>
                      <Switch
                        value={twentyFourSeven}
                        onValueChange={handleWithTwentyFourSevenChange}
                      />
                    </HStack>

                    <FormControlLabel>
                      <FormControlLabelText
                        style={{ fontFamily: 'Neuwelt-Light' }}
                      >
                        Radio: {radiusMt} m
                      </FormControlLabelText>
                    </FormControlLabel>

                    <HStack space="md" className="mt-0">
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

                    <Button
                      className=" shadow-xl mt-2"
                      onPress={handleViewAllParkingLots}
                      variant="outline"
                    >
                      <ButtonText
                        style={{
                          fontFamily: 'Neuwelt-Light',
                          fontWeight: 'bold',
                        }}
                      >
                        Mostrar todos los parqueaderos
                      </ButtonText>
                    </Button>
                  </VStack>
                </FormControl>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <View
            style={{
              height: 1,
              backgroundColor: '#e0e0e0',
              marginVertical: 2,
              borderRadius: 1,
            }}
          />

          <Heading
            className="text-2xl mt-3 text-gray-900"
            style={{ fontFamily: 'Neuwelt-Bold' }}
          >
            Parqueaderos recientes
          </Heading>

          <RecentParkingsList
            className="mt-2 flex-1"
            onCardPress={handleParkingCardPress}
          />

          <HomeBanner />
        </VStack>

        {currentParking && (
          <ParkingDetailsSheet
            ref={bottomSheetRef}
            parkingLot={currentParking}
            onCallParkingLot={callParkingLot}
            onOpenMapDirection={openMapDirection}
            onShowReportModal={showReportSheet}
          />
        )}

        {currentParking && (
          <ReportSheet
            ref={reportSheetRef}
            parkingLot={currentParking}
            onConfirm={hideReportSheet}
          />
        )}
      </ScreenWrapper>
    </GestureHandlerRootView>
  )
}
