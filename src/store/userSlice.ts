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
        removeToken: state => { state.token = null}
    }
})

export const { loadToken, removeToken } = userSlice.actions

export const selectToken = (state: RootState) => state.user.token

export default userSlice.reducer
