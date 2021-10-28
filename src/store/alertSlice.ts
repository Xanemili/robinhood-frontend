import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'
import { AlertColor } from '@mui/material/Alert'

export interface SnackbarAlert {
  id: number
  message?: string
  alertType: AlertColor
}

export interface DialogAlert {
  open: boolean
  title?: string
  description?: string
  action?: string
  targetId: number
}

export interface AlertState {
  dialog: DialogAlert
  snackbar: SnackbarAlert[]
}

const initialState: AlertState = {
  snackbar: [{ id: 1, message: '', alertType: 'success' }],
  dialog: { open: false, title: '', description: '', action: '', targetId: 0 }
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    createAlert: (state, action) => {

      const id = state.snackbar[state.snackbar.length - 1].id + 1

      state.snackbar.push({
        id,
        message: action.payload.message,
        alertType: action.payload.type
      })
    },
    removeAlert: (state, action) => {
      state.snackbar.filter( alert => alert.id !== action.payload.id)
    },
    openDialog: (state, action) => {
      state.dialog = action.payload
    },
    closeDialog: (state) => {
      state.dialog.open = false
    },
    ///implement successful deletion.... idk how with modular dialog.
  },
})

export const { createAlert, removeAlert, openDialog, closeDialog } =  alertSlice.actions
export const selectDialog = (state: RootState) => state.alerts.dialog
export const selectAlerts = (state: RootState) => state.alerts.snackbar

export default alertSlice.reducer
