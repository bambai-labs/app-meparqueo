import { GooglePlacesApi, Place, PlacesResponse } from '@/api'
import { useState } from 'react'

export const useSearchPlaces = () => {
  const [places, setPlaces] = useState<Place[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)

  const searchPlace = async (query: string) => {
    try {
      setLoading(true)
      const result = await GooglePlacesApi.post<PlacesResponse>(
        '/places:searchText',
        {
          textQuery: `${query} monteria`,
        },
      )
      setPlaces(result.data.places)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const clearPlaces = () => {
    setPlaces([])
  }

  const onChangeQuery = (query: string) => {
    setQuery(query)
  }

  const clearQuery = () => {
    setQuery('')
  }

  return {
    query,
    places,
    loading,
    searchPlace,
    clearPlaces,
    onChangeQuery,
    clearQuery,
  }
}
