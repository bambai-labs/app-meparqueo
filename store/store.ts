import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './counter'
import { locationSlice } from './location'
import { parkingSlice } from './parking'

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    location: locationSlice.reducer,
    parking: parkingSlice.reducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
