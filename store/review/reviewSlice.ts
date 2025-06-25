import { createSlice } from '@reduxjs/toolkit'

interface State {
  reviewModalVisible: boolean
}

const initialState: State = {
  reviewModalVisible: false,
}

export const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    openReviewModal: (state) => {
      state.reviewModalVisible = true
    },
    closeReviewModal: (state) => {
      state.reviewModalVisible = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { openReviewModal, closeReviewModal } = reviewSlice.actions
