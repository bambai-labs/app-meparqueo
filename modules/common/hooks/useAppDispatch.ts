import { AppDispatch } from '@/store/store' // Solo necesitas AppDispatch aquí
import { useDispatch } from 'react-redux'

export const useAppDispatch = () => useDispatch<AppDispatch>()
