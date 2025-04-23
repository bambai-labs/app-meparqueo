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
          <Text style={{ fontFamily: 'Neuwelt-Bold' }}>{parkingLot.name}</Text>
          <HStack className="items-center">
            <Text style={{ fontFamily: 'Neuwelt-Bold' }} className="text-xl">
              {formatCurrency(parkingLot.price)}
            </Text>
            <Text
              style={{ fontFamily: 'Neuwelt-Bold' }}
              className="text-gray-600"
            >
              {' '}
              / hora
            </Text>
          </HStack>
          <HStack className="items-center mt-3" space="sm">
            <AvailabilityIndicator
              status={parkingLot.status}
              availability={parkingLot.availability}
            />

            {parkingLot.distanceKm && (
              <>
                <Icon as={MapPin} size="md" />
                <Text style={{ fontFamily: 'Neuwelt-Bold' }}>
                  {parkingLot.distanceKm} km
                </Text>
              </>
            )}
          </HStack>
        </VStack>
      </HStack>
    </Pressable>
  )
}
