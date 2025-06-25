import { configureStore } from '@reduxjs/toolkit'
import { bottomSheetSlice } from './bottomsheet'
import { counterSlice } from './counter'
import { locationSlice } from './location'
import { parkingSlice } from './parking'
import { reviewSlice } from './review'
import { searchSlice } from './search'

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    location: locationSlice.reducer,
    parking: parkingSlice.reducer,
    search: searchSlice.reducer,
    bottomsheet: bottomSheetSlice.reducer,
    review: reviewSlice.reducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
