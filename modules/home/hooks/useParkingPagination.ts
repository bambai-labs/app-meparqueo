import { MeParqueoApi, PaginationResponse } from '@/api'
import { useAppDispatch, useAppSelector } from '@/modules/common'
import {
  AuthStatus,
  pushRecentParkingLots,
  setRecentParkingLots,
} from '@/store'
import { useCallback, useEffect, useState } from 'react'

export const useParkingPagination = () => {
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [totalPages, setTotalPages] = useState(0)
  const [initialLoadDone, setInitialLoadDone] = useState(false)
  const { authStatus } = useAppSelector((state) => state.auth)
  const { recentParkings } = useAppSelector((state) => state.parking)

  const dispatch = useAppDispatch()

  const fetchParkings = useCallback(async () => {
    if (loading || !hasMore) return

    if (initialLoadDone && totalPages > 0 && page > totalPages) {
      setHasMore(false)
      return
    }

    try {
      setLoading(true)
      const response = await MeParqueoApi.get<PaginationResponse>(
        `/api/v1/user/recently/stored/parkings?limit=10&page=${page}`,
      )

      const { data, pagination } = response.data.data

      console.log('respuesta de la paginacion:', JSON.stringify(data))

      setTotalPages(pagination.totalPages)
      setInitialLoadDone(true)

      if (data.length === 0) {
        setHasMore(false)
      } else {
        dispatch(pushRecentParkingLots(data))
        setPage((prevPage) => prevPage + 1)
      }
    } catch (error) {
      console.error('Error fetching parkings:', error)
      setHasMore(false)
    } finally {
      setLoading(false)
    }
  }, [page, loading, totalPages, hasMore, initialLoadDone])

  const refreshParkings = async () => {
    // Primero actualizamos el estado local
    setPage(1)
    setHasMore(true)
    setTotalPages(0)
    setInitialLoadDone(false)
    setLoading(true)

    // Limpiamos los datos en redux
    dispatch(setRecentParkingLots([]))

    // Hacemos la petición directamente aquí en lugar de llamar a fetchParkings
    try {
      const response = await MeParqueoApi.get<PaginationResponse>(
        `/api/v1/user/recently/stored/parkings?limit=10&page=1`,
      )

      const { data, pagination } = response.data.data

      setTotalPages(pagination.totalPages)
      setInitialLoadDone(true)

      if (data.length === 0) {
        setHasMore(false)
      } else {
        dispatch(setRecentParkingLots(data))
        setPage(2)
      }
    } catch (error) {
      console.error('Error refreshing parkings:', error)
      setHasMore(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (authStatus === AuthStatus.AUTHENTICATED) {
      fetchParkings()
    }
  }, [authStatus])

  useEffect(() => {
    if (!initialLoadDone) {
      fetchParkings()
    }
  }, [initialLoadDone, fetchParkings])

  return {
    recentParkings,
    loading,
    hasMore,
    fetchParkings,
    refreshParkings,
  }
}
