import { configureStore } from '@reduxjs/toolkit'
import employeeReducer  from './employeeSlice'
import loginReducer from './loginSlice'

export const store = configureStore({
  reducer: {
    empStore : employeeReducer,
    loginStore: loginReducer
  },
})