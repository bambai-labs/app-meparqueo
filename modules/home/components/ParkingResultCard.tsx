import { HStack } from '@/components/ui/hstack'
import { Icon } from '@/components/ui/icon'
import { Image } from '@/components/ui/image'
import { VStack } from '@/components/ui/vstack'
import { MapPin } from 'lucide-react-native'
import { Pressable, Text } from 'react-native'
import { ParkingLot } from '../types'
import { formatCurrency } from '../utils'
import { AvailabilityIndicator } from './AvailabilityIndicator'

interface Props {
  parkingLot: ParkingLot
  className?: string
  onPress?: (parkingLot: ParkingLot) => void
}

export const ParkingResultCard = ({
  parkingLot,
  className = '',
  onPress = () => {},
}: Props) => {
  return (
    <Pressable onPress={() => onPress(parkingLot)}>
      <HStack space="md" className={`${className} rounded-lg p-2 bg-white`}>
        <Image
          source={{
            uri: parkingLot.imageUrls[0],
          }}
          className="w-[150px] h-full rounded-xl"
          alt="Parking image"
        />
        <VStack>
          <Text>{parkingLot.name}</Text>
          <HStack className="items-center">
            <Text className="text-xl">{formatCurrency(parkingLot.price)}</Text>
            <Text className="text-gray-600"> / hora</Text>
          </HStack>
          <HStack className="items-center mt-3" space="sm">
            <AvailabilityIndicator
              status={parkingLot.status}
              availability={parkingLot.availability}
            />

            <Icon as={MapPin} size="md" />
            <Text>{parkingLot.distanceKm} km</Text>
          </HStack>
        </VStack>
      </HStack>
    </Pressable>
  )
}
