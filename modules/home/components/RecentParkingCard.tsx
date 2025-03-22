import { HStack } from '@/components/ui/hstack'
import { ExternalLinkIcon, Icon } from '@/components/ui/icon'
import { VStack } from '@/components/ui/vstack'
import { Linking, Platform, Pressable, Text } from 'react-native'
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
  const openMapDirection = async () => {
    //Los current se reemplazaran por la ubicación precisa del dispositivo
    const currentLat = 8.800618
    const currentLon = -75.7180332
    const destinationLat = 8.7985081
    const destinationLon = -75.7149219

    if (Platform.OS === 'ios') {
      const appleMapsScheme = `maps://?saddr=${currentLat},${currentLon}&daddr=${destinationLat},${destinationLon}`
      const appleMapsFallback = `http://maps.apple.com/?saddr=${currentLat},${currentLon}&daddr=${destinationLat},${destinationLon}`

      const canOpenApple = await Linking.canOpenURL(appleMapsScheme)

      if (canOpenApple) {
        Linking.openURL(appleMapsScheme)
      } else {
        Linking.openURL(appleMapsFallback)
      }

      return
    }

    const schemeURL = `comgooglemaps://?saddr=${currentLat},${currentLon}&daddr=${destinationLat},${destinationLon}&directionsmode=driving`
    const fallbackURL = `https://www.google.com/maps/dir/${currentLat},${currentLon}/${destinationLat},${destinationLon}/`

    const canOpenGoogle = await Linking.canOpenURL(schemeURL)

    if (canOpenGoogle) {
      Linking.openURL(schemeURL)
    } else {
      Linking.openURL(fallbackURL)
    }
  }

  return (
    <Pressable onPress={() => onPress(recentParking)}>
      <VStack className="w-full py-3 px-4 bg-white rounded-xl border border-gray-600 shadow-2xl">
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
