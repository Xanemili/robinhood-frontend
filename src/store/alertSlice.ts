import { createSlice, AsyncThunk, AnyAction} from '@reduxjs/toolkit'
import { RootState } from './store'
import { AlertColor } from '@mui/material/Alert'
import { convertTypeToMessage } from './utils'
export interface SnackbarAlert {
  id: number
  message?: string
  alertType: AlertColor
}

export interface DialogAlert {
  open: boolean
  title?: string
  description?: string
  action?: () => AnyAction
  id?: number
}

export interface AlertState {
  dialog: DialogAlert
  snackbar: Array<SnackbarAlert>
}

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>
type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

const initialState: AlertState = {
  snackbar: [],
  dialog: { open: false, title: '', description: '', id: 0, action: undefined }
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    createAlert: (state, action) => {
      // Set id to be 1 if there are no current alerts.
      const id = state.snackbar.length === 0 ? 1 : state.snackbar[state.snackbar.length - 1].id + 1
      state.snackbar.push({
        id,
        message: action.payload.message,
        alertType: action.payload.type
      })
    },
    removeAlert: (state, action) => {
      state.snackbar = state.snackbar.splice(-1)
    },
    openDialog: (state, action) => {
      state.dialog = action.payload
    },
    closeDialog: (state) => {
      state.dialog = initialState.dialog
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher<FulfilledAction>(
      (action) => action.type.endsWith('/fulfilled'),
      (state, action) => {
      let msg = convertTypeToMessage(action.type) ?? ''
      const id = state.snackbar.length === 0 ? 1 : state.snackbar[state.snackbar.length - 1].id + 1
      state.snackbar.push({ message: msg, alertType: 'success', id });
    })
    .addMatcher<RejectedAction>(
      (action) => action.type.endsWith('/rejected'),
      (state, action) => {
        let msg = convertTypeToMessage(action.type) ?? ''
        const id = state.snackbar.length === 0 ? 1 : state.snackbar[state.snackbar.length - 1].id + 1
        state.snackbar.push({ message: msg, alertType: 'error', id });
      })
    .addMatcher<PendingAction>(
      (action) => action.type.endsWith('/pending'),
      (state, action) => {
        return state
      }
    )
  }
})

export const { createAlert, removeAlert, openDialog, closeDialog } =  alertSlice.actions
export const selectDialog = (state: RootState) => state.alerts.dialog
export const selectAlerts = (state: RootState) => state.alerts.snackbar

export default alertSlice.reducer
