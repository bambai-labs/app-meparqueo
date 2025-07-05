import { VStack } from '@/components/ui/vstack'
import { Stack } from 'expo-router'

export const NoPermissionsScreen = () => {
  return (
    <VStack className="w-full h-full">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
    </VStack>
  )
}
