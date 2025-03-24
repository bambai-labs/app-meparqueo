import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

export const MeParqueoApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_MEPARQUEO_API,
})

MeParqueoApi.interceptors.request.use(
  async (config) => {
    const userToken = await AsyncStorage.getItem('userToken')
    config.headers['Authorization'] = `Bearer ${userToken}`
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const userUuid = AsyncStorage.getItem('userUuid')
        const { data } = await axios.post(
          `${process.env.EXPO_PUBLIC_MEPARQUEO_API}/api/v1/auth/client`,
          {
            clientId: userUuid,
          },
        )
        const newToken = data.token
        await AsyncStorage.setItem('userToken', newToken)
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`
        return MeParqueoApi(originalRequest)
      } catch (refreshError) {
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  },
)
