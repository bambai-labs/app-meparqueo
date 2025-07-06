import { Linking, Platform } from 'react-native'

export const useOutdatedAppModal = () => {
  const handleUpdate = async () => {
    try {
      if (Platform.OS === 'ios') {
        const appStoreUrl = 'https://apps.apple.com/app/id6747217841'
        await Linking.openURL(appStoreUrl)
        return
      }

      const playStoreUrl =
        'https://play.google.com/store/apps/details?id=com.markuswater.meparqueoapp'
      await Linking.openURL(playStoreUrl)
    } catch (error) {
      console.error('Error al abrir la tienda:', error)
    }
  }

  return { handleUpdate }
}
