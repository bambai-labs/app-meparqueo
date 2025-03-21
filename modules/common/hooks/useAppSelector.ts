import { RootState } from '@/store/store';  // Correcto, importando RootState
import { useSelector, TypedUseSelectorHook } from 'react-redux';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;