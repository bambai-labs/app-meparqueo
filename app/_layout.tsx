import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import '@/global.css'
import { useColorScheme } from '@/hooks/useColorScheme'
import { HeaderLogo } from '@/modules/home/components'
import { store } from '@/store'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import Mapbox from '@rnmapbox/maps'
import Constants from 'expo-constants'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import 'react-native-reanimated'
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
    <GestureHandlerRootView>
      <GluestackUIProvider mode="light">
        <Provider store={store}>
          <ThemeProvider
            value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
          >
            <View
              style={{
                paddingTop: Constants.statusBarHeight,
                backgroundColor: '#ffffff',
              }}
            />
            <HeaderLogo />
            <Stack />
            <StatusBar
              style="dark"
              backgroundColor="#ffffff"
              translucent={false}
            />
          </ThemeProvider>
        </Provider>
      </GluestackUIProvider>
    </GestureHandlerRootView>
  )
}
