import { GooglePlacesApi, PlacesResponse } from '@/api'
import { Alert } from 'react-native'
import { AppDispatch } from '../store'
import { setLoading, setPlaces } from './searchSlice'

export const searchPlace = (query: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true))
      const result = await GooglePlacesApi.post<PlacesResponse>(
        '/places:searchText',
        {
          textQuery: `${query} monteria`,
        },
      )

      if (!result.data.places) {
        Alert.alert('No se encontraron resultados')
        dispatch(setPlaces([]))
        return
      }

      dispatch(setPlaces(result.data.places))
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setLoading(false))
    }
  }
}
