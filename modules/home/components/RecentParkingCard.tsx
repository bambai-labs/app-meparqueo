import { RecentParkingLotResponse } from '@/api'
import { HStack } from '@/components/ui/hstack'
import { ExternalLinkIcon, Icon } from '@/components/ui/icon'
import { VStack } from '@/components/ui/vstack'
import { Pressable, Text } from 'react-native'
import { ParkingLot } from '../types'
import { formatTimestamp } from '../utils'
import { AvailabilityIndicator } from './AvailabilityIndicator'

interface Props {
  recentParking: RecentParkingLotResponse
  onPress?: (parkingLot: ParkingLot) => void
}

export const RecentParkingCard = ({
  recentParking,
  onPress = () => {},
}: Props) => {
  return (
    <Pressable onPress={() => onPress(recentParking.parkingLot)}>
      <VStack className="w-full py-3 px-4 bg-white rounded-xl border border-gray-600 shadow-xl">
        <HStack className="w-full justify-between">
          <Text>
            {formatTimestamp(new Date(recentParking.viewedAt).getTime())}
          </Text>
          <Icon as={ExternalLinkIcon} size="md" color="gray" />
        </HStack>
        <Text className="mt-2 font-bold text-2xl">
          {recentParking.parkingLot.name}
        </Text>
        <HStack className="w-full justify-between mt-2 items-center">
          <AvailabilityIndicator
            availability={recentParking.parkingLot.availability}
            status={recentParking.parkingLot.status}
          />

          <Text className="text-gray-600">
            {recentParking.parkingLot.address}
          </Text>
        </HStack>
      </VStack>
    </Pressable>
  )
}
