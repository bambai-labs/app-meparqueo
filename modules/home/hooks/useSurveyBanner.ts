import { BannerData, BannerDataResponse, MeParqueoApi } from '@/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { Linking } from 'react-native'

export const useSurveyBanner = () => {
  const [bannerData, setBannerData] = useState<BannerData | undefined>(
    undefined,
  )

  const fetchBannerData = async () => {
    try {
      const bannerTouched = Boolean(
        (await AsyncStorage.getItem('bannerTouched')) ?? false,
      )

      if (bannerTouched) {
        return
      }
      const { data } = await MeParqueoApi.get<BannerDataResponse>(
        '/api/v1/config/banner',
      )

      setBannerData(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleBannerPress = async () => {
    if (bannerData) {
      await AsyncStorage.setItem('bannerTouched', 'true')
      await Linking.openURL(bannerData.link)
      setBannerData(undefined)
    }
  }

  useEffect(() => {
    fetchBannerData()
  }, [])

  return { bannerData, handleBannerPress }
}
