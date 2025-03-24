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
            uri: 'https://www.wradio.com.co/resizer/v2/CNVLIH5MPJAM3N7CFHFYZTGUUI.jpg?auth=d95d120b35548dc34d3f611c74f3fc12e2ca1d27d1e5176e0ff1c8c18f0f0a02&width=650&height=488&quality=70&smart=true',
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
            <AvailabilityIndicator availability={parkingLot.availability} />

            <Icon as={MapPin} size="md" />
            <Text>1.2 Km</Text>
          </HStack>
        </VStack>
      </HStack>
    </Pressable>
  )
}
