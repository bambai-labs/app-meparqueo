import { BannerData, BannerDataResponse, MeParqueoApi } from '@/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { Linking } from 'react-native'

export const useHomeBanner = () => {
  const [bannerData, setBannerData] = useState<BannerData | undefined>(
    undefined,
  )

  const getBannerKey = (banner?: BannerData) => {
    if (!banner) return ''
    return `${banner.image || ''}|${banner.link || ''}`
  }

  const fetchBannerData = async () => {
    try {
      const { data } = await MeParqueoApi.get<BannerDataResponse>(
        '/api/v1/config/banner',
      )
      const banner = data.data
      const bannerKey = getBannerKey(banner)
      const touchedKey = await AsyncStorage.getItem('bannerTouchedKey')
      if (bannerKey && touchedKey === bannerKey) {
        setBannerData(undefined)
        return
      }
      setBannerData(banner)
    } catch (error) {
      console.log(error)
    }
  }

  const handleBannerPress = async () => {
    if (bannerData && bannerData.link) {
      const bannerKey = getBannerKey(bannerData)
      await AsyncStorage.setItem('bannerTouchedKey', bannerKey)
      await Linking.openURL(bannerData.link)
      setBannerData(undefined)
    }
  }

  useEffect(() => {
    fetchBannerData()
  }, [])

  return { bannerData, handleBannerPress }
}
