import { getPermissions, useAppDispatch } from '@/modules'
import { setLocation } from '@/store'
import * as Location from 'expo-location'
import { useRootNavigationState, useRouter } from 'expo-router'
import { useEffect } from 'react'
import { ActivityIndicator, Alert } from 'react-native'

export default function Index() {
  const router = useRouter()
  const navigationState = useRootNavigationState()
  const dispatch = useAppDispatch()

  const startWatchingLocation = async () => {
    const hasPermission = await getPermissions()
    if (!hasPermission) {
      Alert.alert(
        'Debes permitir el acceso a tu ubicación para usar la aplicación',
      )
      return
    }

    Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      ({ coords }) => {
        const { longitude, latitude } = coords
        dispatch(setLocation([longitude, latitude]))
      },
    )
  }

  useEffect(() => {
    startWatchingLocation()
  }, [])

  useEffect(() => {
    if (navigationState?.key) {
      router.replace('/home')
    }
  }, [navigationState?.key])

  return <ActivityIndicator />
}
