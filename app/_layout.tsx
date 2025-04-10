import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import '@/global.css'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import Mapbox from '@rnmapbox/maps'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import 'react-native-reanimated'

import { useColorScheme } from '@/hooks/useColorScheme'
import { store } from '@/store'
import { Provider } from 'react-redux'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Neuwelt-Bold': require('@/assets/fonts/Neuwelt-Bold.ttf'),
    'Neuwelt-Light': require('@/assets/fonts/Neuwelt-Light.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  useEffect(() => {
    Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN ?? '')
    Mapbox.setTelemetryEnabled(false)
  }, [])

  if (!loaded) {
    return null
  }

  return (
    <GluestackUIProvider mode="light">
      <Provider store={store}>
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <Stack />
          <StatusBar style="auto" />
        </ThemeProvider>
      </Provider>
    </GluestackUIProvider>
  )
}
