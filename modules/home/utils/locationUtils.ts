import * as Location from 'expo-location'

export const getPermissions = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync()
  if (status !== 'granted') {
    return false
  }
  return true
}

export const getLocation = async () => {
  const hasPermission = await getPermissions()
  if (!hasPermission) return

  let location = await Location.getCurrentPositionAsync({})
  console.log(location)
}
