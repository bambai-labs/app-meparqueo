import { Box } from '@/components/ui/box'
import React, { useRef, useState } from 'react'
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewabilityConfig,
  ViewToken,
} from 'react-native'
import { ParkingLot } from '../types'
import { ParkingResultCard } from './ParkingResultCard'

interface Props {
  parkingLots: ParkingLot[]
  onParkingLotPress: (parkingLot: ParkingLot) => void
  onScroll?: (centeredParkingLot: ParkingLot) => void
}

interface ExtendedViewToken extends ViewToken {
  percentVisible?: number
}

export const ParkingResultsList = ({
  parkingLots,
  onParkingLotPress,
  onScroll,
}: Props) => {
  const [centeredParkingLotId, setCenteredParkingLotId] = useState<
    string | null
  >(null)
  const flatListRef = useRef<FlatList>(null)
  const viewabilityConfig = useRef<ViewabilityConfig>({
    itemVisiblePercentThreshold: 60,
    minimumViewTime: 300,
  })

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<ExtendedViewToken> }) => {
      if (viewableItems.length > 0) {
        const mostVisibleItem = [...viewableItems].sort(
          (a, b) => (b.percentVisible || 0) - (a.percentVisible || 0),
        )[0]

        if (mostVisibleItem?.item?.id) {
          setCenteredParkingLotId(mostVisibleItem.item.id)
        }
      }
    },
  )

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!onScroll || !centeredParkingLotId) return

    const centeredParkingLot = parkingLots.find(
      (parking) => parking.id === centeredParkingLotId,
    )

    if (centeredParkingLot) {
      onScroll(centeredParkingLot)
    }
  }

  return (
    <FlatList
      ref={flatListRef}
      data={parkingLots}
      renderItem={({ item }) => (
        <ParkingResultCard parkingLot={item} onPress={onParkingLotPress} />
      )}
      keyExtractor={(item) => item.id}
      horizontal={true}
      showsHorizontalScrollIndicator={true}
      ItemSeparatorComponent={() => <Box className="w-3" />}
      onScroll={handleScroll}
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={viewabilityConfig.current}
      scrollEventThrottle={16}
    />
  )
}
