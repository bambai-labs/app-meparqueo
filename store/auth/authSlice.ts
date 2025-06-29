import { createSlice } from '@reduxjs/toolkit'
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
    login: (state: State) => {
      state.authStatus = AuthStatus.AUTHENTICATED
    },
    logout: (state: State) => {
      state.authStatus = AuthStatus.UNAUTHENTICATED
    },
  },
})

export const { login, logout } = authSlice.actions
