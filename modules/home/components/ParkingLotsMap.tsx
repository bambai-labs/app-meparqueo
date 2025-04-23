import { Place } from '@/api'
import { Box } from '@/components/ui/box'
import { Image } from '@/components/ui/image'
import { VStack } from '@/components/ui/vstack'
import { useAppSelector } from '@/modules'
import { Camera, MapView, MarkerView } from '@rnmapbox/maps'
import { ForwardedRef, forwardRef, useRef } from 'react'
import { Animated, Pressable, Text, View } from 'react-native'
import { ParkingLot, ParkingLotAvailability, ParkingStatus } from '../types'
import { formatCurrency } from '../utils'

interface Props {
  currentDestination: Place | null
  parkingLots: ParkingLot[]
  onFinishLoading: () => void
  onParkingMarkerPress: (parkingLot: ParkingLot) => void
}

const ParkingMarker = ({
  parkingResult,
  onPress,
}: {
  parkingResult: ParkingLot
  onPress: () => void
}) => {
  const bounceAnimation = useRef(new Animated.Value(0)).current

  const handlePress = () => {
    bounceAnimation.setValue(0)

    Animated.sequence([
      Animated.timing(bounceAnimation, {
        toValue: -15,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(bounceAnimation, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start()

    onPress()
  }

  const getImageSource = () => {
    if (parkingResult.status === ParkingStatus.CLOSED) {
      return require(`@/assets/images/parking_spot_gray.png`)
    } else if (
      parkingResult.availability === ParkingLotAvailability.MORE_THAN_FIVE
    ) {
      return require(`@/assets/images/parking_spot_green.png`)
    } else if (
      parkingResult.availability === ParkingLotAvailability.LESS_THAN_FIVE
    ) {
      return require(`@/assets/images/parking_spot_yellow.png`)
    } else {
      return require(`@/assets/images/parking_spot_red.png`)
    }
  }

  return (
    <View style={{ paddingVertical: 15 }}>
      <Pressable
        onPressIn={(e) => {
          e.stopPropagation()
          handlePress()
        }}
      >
        <Animated.View
          style={{ transform: [{ translateY: bounceAnimation }], zIndex: 999 }}
        >
          <VStack className="items-center">
            <Image
              source={getImageSource()}
              alt="Parking spot"
              className="w-[40px] h-[40px]"
            />

            <VStack className="bg-white p-1 rounded-xl items-center">
              {parkingResult.distanceKm && (
                <Text
                  style={{ fontFamily: 'Neuwelt-Light' }}
                  className="text-[12px]"
                >
                  {parkingResult.distanceKm} km
                </Text>
              )}
              <Text
                style={{ fontFamily: 'Neuwelt-Bold' }}
                className="text-[12px]"
              >
                {formatCurrency(parkingResult.price)} /hr
              </Text>
            </VStack>
          </VStack>
        </Animated.View>
      </Pressable>
    </View>
  )
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
            <ParkingMarker
              parkingResult={parkingResult}
              onPress={() => onParkingMarkerPress(parkingResult)}
            />
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
                className="w-[45px] h-[50px]"
              />
            </VStack>
          </MarkerView>
        )}
      </MapView>
    )
  },
)
