import { Linking } from 'react-native'

export const useNoPermissionsModal = () => {
  const handleOpenConfig = () => {
    Linking.openSettings()
  }

  return { handleOpenConfig }
}
