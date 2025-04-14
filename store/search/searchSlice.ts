import { Place } from '@/api'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
  query: string
  places: Place[]
  loading: boolean
}

const initialState: State = {
  query: '',
  places: [],
  loading: false,
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearPlaces: (state: State) => {
      state.places = []
    },
    onChangeQuery: (state: State, action: PayloadAction<string>) => {
      state.query = action.payload
    },
    clearQuery: (state: State) => {
      state.query = ''
    },
    setLoading: (state: State, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setPlaces: (state: State, action: PayloadAction<Place[]>) => {
      state.places = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { clearPlaces, onChangeQuery, clearQuery, setLoading, setPlaces } =
  searchSlice.actions
