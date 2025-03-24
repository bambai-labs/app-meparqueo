import { GooglePlacesApi, Place, PlacesResponse } from '@/api'
import { useState } from 'react'

export const useSearchPlaces = () => {
  const [places, setPlaces] = useState<Place[]>([])
  const [query, setQuery] = useState('')

  const searchPlace = async (query: string) => {
    const result = await GooglePlacesApi.post<PlacesResponse>(
      '/places:searchText',
      {
        textQuery: query,
      },
    )

    console.log(result.data.places)
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
    searchPlace,
    clearPlaces,
    onChangeQuery,
    clearQuery,
  }
}
