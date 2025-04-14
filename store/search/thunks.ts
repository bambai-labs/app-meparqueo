import { GooglePlacesApi, PlacesResponse } from '@/api'
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
      dispatch(setPlaces(result.data.places))
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setLoading(false))
    }
  }
}
