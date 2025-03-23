import { VStack } from '@/components/ui/vstack'
import { ScreenWrapper } from '@/modules/common'
import Constants from 'expo-constants'
import { Stack } from 'expo-router'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SearchBar } from '../components'

export const SearchScreen = () => {
  return (
    <GestureHandlerRootView>
      <ScreenWrapper>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />

        <VStack
          style={{
            paddingTop: Constants.statusBarHeight + 20,
          }}
        >
          <SearchBar />
        </VStack>
      </ScreenWrapper>
    </GestureHandlerRootView>
  )
}
