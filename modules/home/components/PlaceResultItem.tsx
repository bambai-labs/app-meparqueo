import { Place } from '@/api'
import { HStack } from '@/components/ui/hstack'
import { Icon } from '@/components/ui/icon'
import { MapPin } from 'lucide-react-native'
import { Text, TouchableOpacity } from 'react-native'

interface Props {
  place: Place
  handlePlacePress: (place: Place) => void
}

export const PlaceResultItem = ({ place, handlePlacePress }: Props) => {
  return (
    <TouchableOpacity onPress={() => handlePlacePress(place)}>
      <HStack className="items-center p-3 border-b border-gray-100" space="md">
        <Icon as={MapPin} size="md" />
        <Text style={{ fontFamily: 'Neuwelt-Light' }}>
          {place.displayName.text}
        </Text>
      </HStack>
    </TouchableOpacity>
  )
}
