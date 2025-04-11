import { VStack } from '@/components/ui/vstack'
import { Stack } from 'expo-router'
import { ParkingLotsMap } from '../components'
import { useAllParkingLots } from '../hooks'

export const AllParkingLotsScreen = () => {
  const { cameraRef, handleMapFinishLoading } = useAllParkingLots()

  return (
    <VStack className="h-full w-full">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <ParkingLotsMap
        currentDestination={null}
        parkingLots={[]}
        ref={cameraRef}
        onFinishLoading={handleMapFinishLoading}
        onParkingMarkerPress={() => {}}
      />
    </VStack>
  )
}
