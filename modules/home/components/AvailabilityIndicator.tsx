import { Box } from '@/components/ui/box'
import { HStack } from '@/components/ui/hstack'
import { useMemo } from 'react'
import { Text } from 'react-native'
import { ParkingLotAvailability } from '../types'
import { getAvailabilityIndicatorStyles } from '../utils'

interface Props {
  availability: ParkingLotAvailability
  className?: string
}

export const AvailabilityIndicator = ({
  availability,
  className = '',
}: Props) => {
  const indicatorStyles = useMemo(
    () => getAvailabilityIndicatorStyles(availability),
    [availability],
  )

  return (
    <HStack space="sm" className={`${className} items-center`}>
      <Box className={`${indicatorStyles.indicatorColor} p-4 rounded-full`} />
      <Text className="font-bold">{indicatorStyles.indicatorText}</Text>
    </HStack>
  )
}
