import axios from 'axios'

export const GooglePlacesApi = axios.create({
  baseURL: 'https://places.googleapis.com/v1',
})

GooglePlacesApi.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json'
    config.headers['X-Goog-FieldMask'] =
      'places.displayName,places.formattedAddress,places.priceLevel,places.location'
    config.headers['X-Goog-Api-Key'] =
      process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
