import { AppVersionResponse, MeParqueoApi, socketManager } from '@/api'
import { getPermissions, ParkingUpdateEstatus, useAppDispatch } from '@/modules'
import { setLocation, updateParkingLotAvailability } from '@/store'
import { isAxiosError } from 'axios'
import Constants from 'expo-constants'
import * as Location from 'expo-location'
import { useRootNavigationState, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { ActivityIndicator, Alert } from 'react-native'
import 'react-native-get-random-values'

export default function Index() {
  const router = useRouter()
  const navigationState = useRootNavigationState()
  const dispatch = useAppDispatch()
  const [isInitialized, setIsInitialized] = useState(false)

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
        registerUserLocation(latitude, longitude)
      },
    )
  }

  const registerUserLocation = async (latitude: number, longitude: number) => {
    try {
      await MeParqueoApi.post('/api/v1/user/location', {
        latitude,
        longitude,
      })

      console.log('Location registered successfully')
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response)
        return
      }

      console.log(error)
    }
  }

  const initializeSocket = async () => {
    await socketManager.initialize()
    const socket = socketManager.getSocket()
    socket.on('parkingUpdateStatus', handleParkingUpdateStatus)
  }

  const handleParkingUpdateStatus = (data: ParkingUpdateEstatus) => {
    dispatch(updateParkingLotAvailability(data))
  }

  const isAppUpdated = async (): Promise<boolean> => {
    try {
      const { data } = await MeParqueoApi.get<AppVersionResponse>(
        '/api/v1/config/version',
      )
      const currentVersion = Constants.expoConfig?.version

      console.log(
        `Client version: ${currentVersion} - Server version: ${data.data.app.version}`,
      )

      return data.data.app.version === currentVersion
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const handleAppInitialization = async () => {
    try {
      const isUpdated = await isAppUpdated()

      if (!isUpdated) {
        router.replace('/home/outdated')
        return
      }
      await startWatchingLocation()
      await initializeSocket()

      setIsInitialized(true)
    } catch (error) {
      console.error('Error during app initialization:', error)
      // TODO: Handle error
    }
  }

  useEffect(() => {
    if (navigationState?.key) {
      handleAppInitialization()
    }
  }, [navigationState?.key])

  useEffect(() => {
    if (isInitialized && navigationState?.key) {
      router.replace('/home')
    }
  }, [isInitialized, navigationState?.key])

  return <ActivityIndicator />
}
