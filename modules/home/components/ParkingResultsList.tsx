import React from 'react'
import { FlatList } from 'react-native'
import { ParkingLot } from '../types'
import { ParkingResultCard } from './ParkingResultCard'

interface Props {
  parkingLots: ParkingLot[]
  onParkingLotPress: (parkingLot: ParkingLot) => void
}

export const ParkingResultsList = ({
  parkingLots,
  onParkingLotPress,
}: Props) => {
  return (
    <FlatList
      data={parkingLots}
      renderItem={({ item }) => (
        <ParkingResultCard parkingLot={item} onPress={onParkingLotPress} />
      )}
      keyExtractor={(item) => item.id}
      horizontal={true}
      showsHorizontalScrollIndicator={true}
    />
  )
}
