import { Place } from '@/api'
import { FlatList } from 'react-native'
import { PlaceResultItem } from './PlaceResultItem'

interface Props {
  places: Place[]
  handlePlacePress: (place: Place) => void
}

export const PlacesResultList = ({ places, handlePlacePress }: Props) => {
  return (
    <FlatList
      className="w-full"
      data={places}
      keyExtractor={(place) =>
        `${place.location.longitude}${place.location.latitude}`
      }
      renderItem={({ item }) => (
        <PlaceResultItem place={item} handlePlacePress={handlePlacePress} />
      )}
    />
  )
}
