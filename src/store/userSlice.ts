import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: null,
        status: 'idle',
    },
    reducers: {
        loadToken: (state, action) => { state.token = action.payload },
        resetToken: state => { state.token = null}
    }
})

export const { loadToken, resetToken } = userSlice.actions

export const selectToken = (state: RootState) => state.user.token

export default userSlice.reducer
