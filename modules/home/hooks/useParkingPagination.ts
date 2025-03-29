import {
  MeParqueoApi,
  PaginationResponse,
  RecentParkingLotResponse,
} from '@/api'
import { useCallback, useEffect, useState } from 'react'

export const useParkingPagination = () => {
  const [parkings, setParkings] = useState<RecentParkingLotResponse[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [totalPages, setTotalPages] = useState(0)

  const fetchParkings = useCallback(async () => {
    if (loading || (totalPages > 0 && page > totalPages)) return

    try {
      setLoading(true)
      const response = await MeParqueoApi.get<PaginationResponse>(
        `/api/v1/user/recently/stored/parkings?limit=10&page=${page}`,
      )

      const { data, pagination } = response.data.data

      console.log('respuesta de la paginacion xixi', data)

      setTotalPages(pagination.totalPages)

      if (data.length === 0) {
        setHasMore(false)
      } else {
        setParkings((prevParkings) =>
          page === 1 ? data : [...prevParkings, ...data],
        )

        setPage((prevPage) => prevPage + 1)
      }
    } catch (error) {
      console.error('Error fetching parkings:', error)
      setHasMore(false)
    } finally {
      setLoading(false)
    }
  }, [page, loading, totalPages])

  const refreshParkings = () => {
    setParkings([])
    setPage(1)
    setHasMore(true)
    setTotalPages(0)
    fetchParkings()
  }

  useEffect(() => {
    fetchParkings()
  }, [])

  return {
    parkings,
    loading,
    hasMore,
    fetchParkings,
    refreshParkings,
  }
}
