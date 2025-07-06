import { ScreenWrapper } from '@/modules/common'
import { Stack } from 'expo-router'
import React from 'react'
import { NoInternetModal } from '../components'

export const NoInternetScreen = () => {
  return (
    <ScreenWrapper>
      <Stack.Screen options={{ headerShown: false }} />
      <NoInternetModal />
    </ScreenWrapper>
  )
}
