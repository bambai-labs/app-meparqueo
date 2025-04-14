import { Box } from '@/components/ui/box'
import { Button } from '@/components/ui/button'
import { HStack } from '@/components/ui/hstack'
import { Icon } from '@/components/ui/icon'
import { Image as GluestackImage } from '@/components/ui/image'
import { VStack } from '@/components/ui/vstack'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { AlertCircleIcon, MapIcon, PhoneIcon } from 'lucide-react-native'
import Carousel from 'pinar'
import React, { forwardRef, useMemo } from 'react'
import { Text, View } from 'react-native'
import { ParkingLot } from '../types'
import { formatCurrency, parsePaymentMethod, parseService } from '../utils'
import { AvailabilityIndicator } from './AvailabilityIndicator'

interface Props {
  parkingLot: ParkingLot
  onCallParkingLot: () => void
  onOpenMapDirection: () => void
  onShowReportModal: () => void
}

export const ParkingDetailsSheet = forwardRef<BottomSheet, Props>(
  (
    { parkingLot, onCallParkingLot, onOpenMapDirection, onShowReportModal },
    ref,
  ) => {
    const services = useMemo(() => {
      return parkingLot.services.map(parseService).join(', ')
    }, [parkingLot])

    const paymentMethods = useMemo(() => {
      return parkingLot.paymentMethods.map(parsePaymentMethod).join(', ')
    }, [parkingLot])

    return (
      <BottomSheet
        ref={ref}
        enablePanDownToClose={true}
        index={-1}
        snapPoints={['50%', '80%']}
      >
        <BottomSheetView className="px-6 pb-4">
          <Box className="h-96 rounded-2xl overflow-hidden">
            {parkingLot && (
              <Carousel
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

          <Text className="mt-4 text-3xl font-bold">{parkingLot?.name}</Text>
          <HStack className="w-full justify-between items-center">
            <HStack className="items-center">
              <Text className="text-xl">
                {formatCurrency(parkingLot.price ?? 0)}
              </Text>
              <Text className="text-gray-600"> / hora</Text>
            </HStack>

            <HStack space="sm">
              <Text className="font-bold">{parkingLot.reportsCount}</Text>
              <Text>Reportes negativos</Text>
            </HStack>
          </HStack>

          <AvailabilityIndicator
            className="mt-2"
            availability={parkingLot.availability}
            status={parkingLot.status}
          />

          <HStack className="w-full justify-evenly mt-3">
            <VStack className="items-center">
              <Button
                onPress={onCallParkingLot}
                size="xl"
                className="w-16 h-16 rounded-xl"
              >
                <Icon as={PhoneIcon} size="xl" color="white" />
              </Button>
              <Text className="mt-2 text-gray-600">Llamar</Text>
            </VStack>

            <VStack className="items-center">
              <Button
                onPress={onOpenMapDirection}
                size="xl"
                className="w-16 h-16 rounded-xl"
              >
                <Icon as={MapIcon} size="xl" color="white" />
              </Button>
              <Text className="mt-2 text-gray-600">Trazar ruta</Text>
            </VStack>

            <VStack className="items-center">
              <Button
                onPress={onShowReportModal}
                size="xl"
                className="w-16 h-16 rounded-xl"
              >
                <Icon as={AlertCircleIcon} size="xl" color="white" />
              </Button>
              <Text className="mt-2 text-gray-600">Reportar</Text>
            </VStack>
          </HStack>

          <Text className="mt-3 text-xl font-bold">Servicios adicionales</Text>

          <HStack>
            <Text className="text-gray-600 text-xl">{services}</Text>
          </HStack>

          <Text className="mt-3 text-xl font-bold">Métodos de pago</Text>

          <Text className="text-gray-600 text-xl">{paymentMethods}</Text>
        </BottomSheetView>
      </BottomSheet>
    )
  },
)
