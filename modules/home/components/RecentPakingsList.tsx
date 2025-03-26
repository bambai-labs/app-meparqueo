import { FlatList } from 'react-native'
import { RecentParkingLot } from '../types'
import { RecentParkingCard } from './RecentParkingCard'

interface Props {
  recentParkings: RecentParkingLot[]
  onCardPress: (parkingLot: RecentParkingLot) => void
}

export const RecentPakingsList = ({ recentParkings, onCardPress }: Props) => {
  return (
    <FlatList
      className="mt-5"
      data={recentParkings}
      renderItem={({ item }) => (
        <RecentParkingCard
          recentParking={item}
          onPress={() => onCardPress(item)}
        />
      )}
      keyExtractor={(item) => item.name}
    />
  )
}
