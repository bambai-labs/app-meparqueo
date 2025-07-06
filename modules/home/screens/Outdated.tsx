import { ScreenWrapper } from '@/modules/common'
import { Stack } from 'expo-router'
import { OutdatedAppModal } from '../components'

export const OutdatedScreen = () => {
  return (
    <ScreenWrapper>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <OutdatedAppModal />
    </ScreenWrapper>
  )
}
