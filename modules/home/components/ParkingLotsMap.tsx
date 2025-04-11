import { Place } from '@/api'
import { Box } from '@/components/ui/box'
import { Image } from '@/components/ui/image'
import { VStack } from '@/components/ui/vstack'
import { useAppSelector } from '@/modules'
import { Camera, MapView, MarkerView } from '@rnmapbox/maps'
import { ForwardedRef, forwardRef } from 'react'
import { Pressable, Text } from 'react-native'
import { ParkingLot, ParkingLotAvailability, ParkingStatus } from '../types'
import { formatCurrency } from '../utils'

interface Props {
  currentDestination: Place | null
  parkingLots: ParkingLot[]
  onFinishLoading: () => void
  onParkingMarkerPress: (parkingLot: ParkingLot) => void
}

export const ParkingLotsMap = forwardRef<Camera, Props>(
  (
    {
      currentDestination,
      parkingLots,
      onFinishLoading,
      onParkingMarkerPress,
    }: Props,
    ref: ForwardedRef<Camera>,
  ) => {
    const { deviceLocation } = useAppSelector((state) => state.location)

    return (
      <MapView
        style={{
          height: '100%',
          width: '100%',
        }}
        logoEnabled={false}
        onDidFinishLoadingStyle={onFinishLoading}
        scaleBarEnabled={false}
      >
        <Camera ref={ref} />

        {parkingLots.map((parkingResult) => (
          <MarkerView
            key={parkingResult.name}
            coordinate={[parkingResult.longitude, parkingResult.latitude]}
            allowOverlap={true}
          >
            <Pressable onPress={() => onParkingMarkerPress(parkingResult)}>
              <VStack className="items-center">
                {parkingResult.status === ParkingStatus.CLOSED ? (
                  <Image
                    source={require(`@/assets/images/parking_spot_gray.png`)}
                    style={{
                      width: 40,
                      height: 40,
                    }}
                  />
                ) : parkingResult.availability ===
                  ParkingLotAvailability.MORE_THAN_FIVE ? (
                  <Image
                    source={require(`@/assets/images/parking_spot_green.png`)}
                    style={{
                      width: 40,
                      height: 40,
                    }}
                  />
                ) : parkingResult.availability ===
                  ParkingLotAvailability.LESS_THAN_FIVE ? (
                  <Image
                    source={require(`@/assets/images/parking_spot_yellow.png`)}
                    style={{
                      width: 40,
                      height: 40,
                    }}
                  />
                ) : (
                  <Image
                    source={require(`@/assets/images/parking_spot_red.png`)}
                    style={{
                      width: 40,
                      height: 40,
                    }}
                  />
                )}

                <VStack className="bg-white p-1 rounded-xl items-center">
                  <Text className="text-md">{parkingResult.distanceKm} km</Text>
                  <Text className="text-sm">
                    {formatCurrency(parkingResult.price)} /hr
                  </Text>
                </VStack>
              </VStack>
            </Pressable>
          </MarkerView>
        ))}

        {deviceLocation && (
          <MarkerView allowOverlap={true} coordinate={deviceLocation}>
            <Box className="p-3 bg-blue-500 rounded-full border-3 border-white" />
          </MarkerView>
        )}

        {currentDestination && (
          <MarkerView
            coordinate={[
              currentDestination.location.longitude,
              currentDestination.location.latitude,
            ]}
            allowOverlap={true}
          >
            <VStack className="items-center">
              <Image
                source={require('@/assets/images/pin_destination.png')}
                style={{
                  width: 50,
                  height: 55,
                }}
              />
            </VStack>
          </MarkerView>
        )}
      </MapView>
    )
  },
)
