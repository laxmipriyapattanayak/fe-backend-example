import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLogin: false,
  username: ''
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginStatus: (state, action) => {
      state.isLogin = action.payload.status
      state.username = action.payload.username
    }
  },
})

export const { loginStatus } = loginSlice.actions

export default loginSlice.reducer