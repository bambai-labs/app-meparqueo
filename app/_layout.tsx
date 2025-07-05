import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import '@/global.css'
import { useColorScheme } from '@/hooks/useColorScheme'
import { HeaderLogo } from '@/modules/home/components'
import { store } from '@/store'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { firebase } from '@react-native-firebase/analytics'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import Mapbox from '@rnmapbox/maps'
import Constants from 'expo-constants'
import { useFonts } from 'expo-font'
import * as Notifications from 'expo-notifications'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { Alert, Platform, View } from 'react-native'
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

  const requestNotificationPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert(
        'Permiso denegado',
        'Por favor, habilita las notificaciones para recibir alertas de parqueo.',
      )
    }
  }

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  useEffect(() => {
    Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN ?? '')
    Mapbox.setTelemetryEnabled(false)

    if (process.env.EXPO_PUBLIC_DEV_MODE === 'dev') {
      firebase.analytics().setAnalyticsCollectionEnabled(false)
    }

    if (Platform.OS !== 'web') {
      requestNotificationPermission()
    }
  }, [])

  if (!loaded) {
    return null
  }

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
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
              <Stack>
                <Stack.Screen
                  name="home"
                  options={{
                    headerShown: false,
                  }}
                />
              </Stack>
              <StatusBar
                style="dark"
                backgroundColor="#ffffff"
                translucent={false}
              />
            </ThemeProvider>
          </Provider>
        </GluestackUIProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}
