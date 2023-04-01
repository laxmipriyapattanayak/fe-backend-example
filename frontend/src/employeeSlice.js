import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const initialState = {
    employee: [],
    isLoading: false,
    error: '',
    apiReply: {}
}

export const fetchEmployee = createAsyncThunk(
    'employee/fetchEmployee',
    async () => {
        const response = await axios.get('http://localhost:3001/employee')
        return response.data;
    }
)

export const addEmployee = createAsyncThunk(
    'employee/addEmployee',
    async (emp) => {
        const response = await axios.post('http://localhost:3001/employee', emp)
        return response.data;
    }
)

export const deleteEmployee = createAsyncThunk(
    'employee/deleteEmployee',
    async (id) => {
        const response = await axios.delete(`http://localhost:3001/employee/${id}`)
        return response.data;
    }
)

export const updateEmployee = createAsyncThunk(
    'employee/updateEmployee',
    async (emp) => {
        const response = await axios.put(`http://localhost:3001/employee/${emp.id}`, {name: emp.name, designation: emp.designation})
        return response.data;
    }
)

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    add: (state) => {
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEmployee.fulfilled, (state, action) => {
      state.employee = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchEmployee.pending, (state, action) => {
        state.employee = []
        state.isLoading = true
    })
    builder.addCase(fetchEmployee.rejected, (state, action) => {
        state.employee = []
        state.isLoading = false
        state.error = action.payload
    })

    builder.addCase(addEmployee.fulfilled, (state, action) => {
        state.isLoading = false
        state.apiReply = action.payload
    })

    builder.addCase(deleteEmployee.fulfilled, (state, action) => {
        state.isLoading = false
        state.apiReply = action.payload
    })

    builder.addCase(updateEmployee.fulfilled, (state, action) => {
        state.isLoading = false
        state.apiReply = action.payload
    })
  }
})

//export const {  } = employeeSlice.actions

export default employeeSlice.reducer