import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface LocationSliceState {
  deviceLocation: [number, number] | null
}

const initialState: LocationSliceState = {
  deviceLocation: null,
}

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (
      state: LocationSliceState,
      action: PayloadAction<[number, number] | null>,
    ) => {
      state.deviceLocation = action.payload
    },
  },
})

export const { setLocation } = locationSlice.actions
