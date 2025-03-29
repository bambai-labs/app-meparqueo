import { Box } from '@/components/ui/box'
import { HStack } from '@/components/ui/hstack'
import { useMemo } from 'react'
import { Text } from 'react-native'
import { ParkingLotAvailability, ParkingStatus } from '../types'
import { getAvailabilityIndicatorStyles } from '../utils'

interface Props {
  availability: ParkingLotAvailability
  status: ParkingStatus
  className?: string
}

export const AvailabilityIndicator = ({
  availability,
  status,
  className = '',
}: Props) => {
  const indicatorStyles = useMemo(
    () => getAvailabilityIndicatorStyles(availability),
    [availability],
  )

  return (
    <HStack space="sm" className={`${className} items-center`}>
      {status === ParkingStatus.CLOSED ? (
        <>
          <Box className={`bg-gray-400 p-4 rounded-full`} />
          <Text className="font-bold">Cerrado</Text>
        </>
      ) : (
        <>
          <Box
            className={`${indicatorStyles.indicatorColor} p-4 rounded-full`}
          />
          <Text className="font-bold">{indicatorStyles.indicatorText}</Text>
        </>
      )}
    </HStack>
  )
}
