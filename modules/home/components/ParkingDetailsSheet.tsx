import { Box } from '@/components/ui/box'
import { Button } from '@/components/ui/button'
import { HStack } from '@/components/ui/hstack'
import { AlertCircleIcon, Icon } from '@/components/ui/icon'
import { Image as GluestackImage } from '@/components/ui/image'
import { VStack } from '@/components/ui/vstack'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { ChevronsDown, MapIcon, PhoneIcon } from 'lucide-react-native'
import Carousel from 'pinar'
import React, { forwardRef, useCallback, useMemo } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { ParkingLot } from '../types'
import { formatCurrency, parsePaymentMethod, parseService } from '../utils'
import { AvailabilityIndicator } from './AvailabilityIndicator'

interface Props {
  parkingLot: ParkingLot
  onCallParkingLot: () => void
  onOpenMapDirection: () => void
  onShowReportModal: () => void
  onChange?: (index: number) => void
}

export const ParkingDetailsSheet = forwardRef<BottomSheet, Props>(
  (
    {
      parkingLot,
      onCallParkingLot,
      onOpenMapDirection,
      onShowReportModal,
      onChange = () => {},
    },
    ref,
  ) => {
    const services = useMemo(() => {
      return parkingLot.services.map(parseService).join(', ')
    }, [parkingLot])

    const paymentMethods = useMemo(() => {
      return parkingLot.paymentMethods.map(parsePaymentMethod).join(', ')
    }, [parkingLot])

    const windowHeight = Dimensions.get('window').height

    const snapPoints = useMemo(() => ['50%', '85%'], [windowHeight])

    const renderContent = useCallback(() => {
      return (
        <View style={styles.contentContainer}>
          <Box className="h-80 rounded-2xl overflow-hidden">
            {parkingLot && (
              <Carousel
                key={parkingLot.id}
                autoplay
                autoplayInterval={5000}
                loop
                showsControls={true}
                showsDots
              >
                {parkingLot.imageUrls.map((imageUri, index) => (
                  <View key={imageUri} className="w-full">
                    <GluestackImage
                      size="full"
                      source={{ uri: imageUri }}
                      alt={`Slide ${index + 1}`}
                    />
                  </View>
                ))}
              </Carousel>
            )}
          </Box>

          <Text
            style={{ fontFamily: 'Neuwelt-Bold' }}
            className="mt-4 text-3xl font-bold"
          >
            {parkingLot?.name}
          </Text>
          <HStack className="w-full justify-between items-center">
            <HStack className="items-center">
              <Text style={{ fontFamily: 'Neuwelt-Bold' }} className="text-xl">
                {formatCurrency(parkingLot.price ?? 0)}
              </Text>
              <Text
                style={{ fontFamily: 'Neuwelt-Bold' }}
                className="text-gray-600"
              >
                {' '}
                / hora
              </Text>
            </HStack>
            <HStack space="sm">
              <Text
                style={{ fontFamily: 'Neuwelt-Bold' }}
                className="font-bold"
              >
                {parkingLot.reportsCount}
              </Text>
              <Text style={{ fontFamily: 'Neuwelt-Bold' }}>
                Reportes este mes
              </Text>
            </HStack>
          </HStack>

          <Text
            style={{ fontFamily: 'Neuwelt-Light', fontStyle: 'italic' }}
            className="text-gray-600"
          >
            precio estimado
          </Text>

          <AvailabilityIndicator
            className="mt-2"
            availability={parkingLot.availability}
            status={parkingLot.status}
          />

          <HStack className="w-full justify-evenly mt-3">
            {parkingLot.phoneNumber?.length === 10 && (
              <VStack className="items-center">
                <Button
                  onPress={onCallParkingLot}
                  size="xl"
                  className="w-16 h-16 rounded-xl"
                >
                  <Icon as={PhoneIcon} size="xl" color="white" />
                </Button>
                <Text
                  style={{ fontFamily: 'Neuwelt-Bold' }}
                  className="mt-2 text-gray-600"
                >
                  Llamar
                </Text>
              </VStack>
            )}

            <VStack className="items-center">
              <Button
                onPress={onOpenMapDirection}
                size="xl"
                className="w-16 h-16 rounded-xl"
              >
                <Icon as={MapIcon} size="xl" color="white" />
              </Button>
              <Text
                style={{ fontFamily: 'Neuwelt-Bold' }}
                className="mt-2 text-gray-600"
              >
                Trazar ruta
              </Text>
            </VStack>

            <VStack className="items-center">
              <Button
                onPress={onShowReportModal}
                size="xl"
                className="w-16 h-16 rounded-xl"
              >
                <Icon as={AlertCircleIcon} size="xl" color="white" />
              </Button>
              <Text
                style={{ fontFamily: 'Neuwelt-Bold' }}
                className="mt-2 text-gray-600"
              >
                Reportar
              </Text>
            </VStack>
          </HStack>

          {services.length !== 0 && (
            <Text
              style={{ fontFamily: 'Neuwelt-Bold' }}
              className="mt-3 text-xl font-bold"
            >
              Servicios adicionales
            </Text>
          )}

          <HStack>
            <Text
              style={{ fontFamily: 'Neuwelt-Bold' }}
              className="text-gray-600 text-xl"
            >
              {services}
            </Text>
          </HStack>

          {paymentMethods.length !== 0 && (
            <Text
              style={{ fontFamily: 'Neuwelt-Bold' }}
              className="mt-3 text-xl font-bold"
            >
              Métodos de pago
            </Text>
          )}

          <Text
            style={{ fontFamily: 'Neuwelt-Bold' }}
            className="text-gray-600 text-xl"
          >
            {paymentMethods}
          </Text>

          <Text
            style={{ fontFamily: 'Neuwelt-Bold' }}
            className="mt-3 text-xl font-bold"
          >
            Acerca del parqueadero
          </Text>

          <Text
            style={{ fontFamily: 'Neuwelt-Light' }}
            className="text-gray-600 text-xl mb-8"
          >
            {parkingLot.description}
          </Text>
        </View>
      )
    }, [
      parkingLot,
      services,
      paymentMethods,
      onCallParkingLot,
      onOpenMapDirection,
      onShowReportModal,
    ])

    return (
      <BottomSheet
        ref={ref}
        enablePanDownToClose={true}
        index={-1}
        snapPoints={snapPoints}
        onChange={onChange}
        handleComponent={() => (
          <HStack
            className="items-center justify-center w-full bg-[#FAF9F6]"
            style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
          >
            <Icon as={ChevronsDown} className="w-9 h-9" />
          </HStack>
        )}
        style={{
          backgroundColor: '#FAF9F6',
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}
      >
        <BottomSheetScrollView contentContainerStyle={styles.scrollViewContent}>
          {renderContent()}
        </BottomSheetScrollView>
      </BottomSheet>
    )
  },
)

const styles = StyleSheet.create({
  contentContainer: {
    padding: 24,
    paddingBottom: 100, // Padding adicional en la parte inferior
    backgroundColor: '#FAF9F6',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
})
