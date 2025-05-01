import { Box } from '@/components/ui/box'
import Carousel from 'pinar'
import React, { forwardRef } from 'react'
import { ParkingLot } from '../types'
import { ParkingResultCard } from './ParkingResultCard'

interface Props {
  parkingLots: ParkingLot[]
  onParkingLotPress: (parkingLot: ParkingLot) => void
  onScroll?: (centeredParkingLot: ParkingLot) => void
}

export const ParkingResultsList = forwardRef<Carousel, Props>(
  function ParkingResultsList(
    { parkingLots, onParkingLotPress, onScroll },
    ref,
  ) {
    return (
      <Box className="w-full h-28">
        <Carousel
          ref={ref}
          autoplay={false}
          showsControls={false}
          showsDots={false}
          onIndexChanged={({ index }) => {
            const centered = parkingLots[index]
            onScroll?.(centered)
          }}
        >
          {parkingLots.map((parkingLot) => (
            <ParkingResultCard
              key={parkingLot.id}
              parkingLot={parkingLot}
              onPress={onParkingLotPress}
              className="w-screen"
            />
          ))}
        </Carousel>
      </Box>
    )
  },
)
