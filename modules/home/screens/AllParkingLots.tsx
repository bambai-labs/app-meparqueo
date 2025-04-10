import { VStack } from '@/components/ui/vstack'
import { ScreenWrapper } from '@/modules/common'
import Constants from 'expo-constants'
import { Stack } from 'expo-router'
import { Text } from 'react-native'

export const AllParkingLotsScreen = () => {
  return (
    <ScreenWrapper>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <VStack
        style={{
          paddingTop: Constants.statusBarHeight,
        }}
        className="h-full w-full"
      >
        <Text>Hello world</Text>
      </VStack>
    </ScreenWrapper>
  )
}
