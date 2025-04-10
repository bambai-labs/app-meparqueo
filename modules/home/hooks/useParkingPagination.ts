import { MeParqueoApi, PaginationResponse } from '@/api'
import { useAppDispatch, useAppSelector } from '@/modules/common'
import { pushRecentParkingLots, setRecentParkingLots } from '@/store'
import { useCallback, useEffect, useState } from 'react'

export const useParkingPagination = () => {
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [totalPages, setTotalPages] = useState(0)
  const [initialLoadDone, setInitialLoadDone] = useState(false)
  const { recentParkings } = useAppSelector((state) => state.parking)
  const dispatch = useAppDispatch()

  const fetchParkings = useCallback(async () => {
    // No cargar más si estamos cargando actualmente o si sabemos que no hay más datos
    if (loading || !hasMore) return

    // No seguir paginando si ya sabemos que hemos alcanzado el total de páginas
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

      console.log('respuesta de la paginacion:', data)

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

  const refreshParkings = () => {
    dispatch(setRecentParkingLots([]))
    setPage(1)
    setHasMore(true)
    setTotalPages(0)
    setInitialLoadDone(false)
    // Pequeña pausa para asegurar que el estado se actualiza antes de la nueva petición
    setTimeout(fetchParkings, 0)
  }

  // Cargar datos iniciales cuando el componente se monta
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
