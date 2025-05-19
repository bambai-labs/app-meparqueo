import { Place } from '@/api'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
  query: string
  places: Place[]
  loading: boolean
  radiusMt: number
  onlyAvailable: boolean
  paymentTransfer: boolean
  valetParking: boolean
  twentyFourSeven: boolean
}

const initialState: State = {
  query: '',
  places: [],
  loading: false,
  radiusMt: 100,
  onlyAvailable: false,
  paymentTransfer: false,
  valetParking: false,
  twentyFourSeven: false,
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
    setRadiusMt: (state: State, action: PayloadAction<number>) => {
      state.radiusMt = action.payload
    },
    setOnlyAvailable: (state: State, action: PayloadAction<boolean>) => {
      state.onlyAvailable = action.payload
    },
    setOnlyPaymentTransfer: (state: State, action: PayloadAction<boolean>) => {
      state.paymentTransfer = action.payload
    },
    setWithValetParking: (state: State, action: PayloadAction<boolean>) => {
      state.valetParking = action.payload
    },
    setWithTwentyFourSeven: (state: State, action: PayloadAction<boolean>) => {
      state.twentyFourSeven = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  clearPlaces,
  onChangeQuery,
  clearQuery,
  setLoading,
  setPlaces,
  setRadiusMt,
  setOnlyAvailable,
  setOnlyPaymentTransfer,
  setWithValetParking,
  setWithTwentyFourSeven,
} = searchSlice.actions
