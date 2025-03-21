import { configureStore } from "@reduxjs/toolkit"
import { counterSlice } from "./counter"

export const store = configureStore({
    reducer: counterSlice.reducer
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>