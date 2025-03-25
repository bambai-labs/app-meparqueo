import { RootState } from '@/store/store'; // Correcto, importando RootState
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;