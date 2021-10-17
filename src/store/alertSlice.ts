import { createSlice } from '@reduxjs/toolkit'

export const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    alerts: [{ id: 1, message: null, type: '' }]
  },
  reducers: {
    createAlert: (state, action) => {
      state.alerts.push({
        id: action.payload.id,
        message: action.payload.message,
        type: action.payload.type
      })
    },
    removeAlert: (state, action) => {
      state.alerts.filter( alert => alert.id !== action.payload.id)
    }
  }
})

export const { createAlert, removeAlert } =  alertSlice.actions
export default alertSlice.reducer
