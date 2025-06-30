import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthStatus } from './auth-status.enum'

interface State {
  authStatus: AuthStatus
}

const initialState: State = {
  authStatus: AuthStatus.UNAUTHENTICATED,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthStatus: (state: State, action: PayloadAction<AuthStatus>) => {
      state.authStatus = action.payload
    },
  },
})

export const { setAuthStatus } = authSlice.actions
