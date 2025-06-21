import { Box } from '@/components/ui/box'
import React, { forwardRef } from 'react'
import { Dimensions } from 'react-native'
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel'
import { ParkingLot } from '../types'
import { ParkingResultCard } from './ParkingResultCard'

interface Props {
  parkingLots: ParkingLot[]
  onParkingLotPress: (parkingLot: ParkingLot) => void
  onScroll?: (centeredParkingLot: ParkingLot) => void
}

const width = Dimensions.get('window').width

export const ParkingResultsList = forwardRef<ICarouselInstance, Props>(
  function ParkingResultsList(
    { parkingLots, onParkingLotPress, onScroll },
    ref,
  ) {
    return (
      <Box className="w-full">
        <Carousel
          ref={ref}
          width={width}
          height={128}
          data={parkingLots}
          onScrollEnd={(index) => {
            const centered = parkingLots[index]
            onScroll?.(centered)
          }}
          renderItem={({ item }) => (
            <ParkingResultCard
              key={item.id}
              parkingLot={item}
              onPress={onParkingLotPress}
            />
          )}
        ></Carousel>
      </Box>
    )
  },
)
