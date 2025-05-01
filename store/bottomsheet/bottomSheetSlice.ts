import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
  isExpanded: boolean
}

const initialState: State = {
  isExpanded: false,
}

export const bottomSheetSlice = createSlice({
  name: 'bottomSheet',
  initialState,
  reducers: {
    setIsSheetExpanded: (state: State, action: PayloadAction<boolean>) => {
      state.isExpanded = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setIsSheetExpanded } = bottomSheetSlice.actions
