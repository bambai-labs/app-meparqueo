import { HStack } from '@/components/ui/hstack'
import { ExternalLinkIcon, Icon } from '@/components/ui/icon'
import { VStack } from '@/components/ui/vstack'
import { Pressable, Text } from 'react-native'
import { RecentParkingLot } from '../types'
import { formatTimestamp } from '../utils'
import { AvailabilityIndicator } from './AvailabilityIndicator'

interface Props {
  recentParking: RecentParkingLot
  onPress?: (parkingLot: RecentParkingLot) => void
}

export const RecentParkingCard = ({
  recentParking,
  onPress = () => {},
}: Props) => {
  return (
    <Pressable onPress={() => onPress(recentParking)}>
      <VStack className="w-full py-3 px-4 bg-white rounded-xl border border-gray-600 shadow-xl">
        <HStack className="w-full justify-between">
          <Text>{formatTimestamp(recentParking.timestamp)}</Text>
          <Icon as={ExternalLinkIcon} size="md" color="gray" />
        </HStack>
        <Text className="mt-2 font-bold text-2xl">{recentParking.name}</Text>
        <HStack className="w-full justify-between mt-2 items-center">
          <AvailabilityIndicator availability={recentParking.availability} />

          <Text className="text-gray-600">A 150 m de Calle 41 Crr 2</Text>
        </HStack>
      </VStack>
    </Pressable>
  )
}
