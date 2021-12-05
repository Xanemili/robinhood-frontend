import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'
import { loadUser } from '../fetches/user'

interface UserSlice {
    token: string
    status: string
}

const initialState: UserSlice = {
    token: '',
    status: 'idle',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loadToken: (state, action) => { state.token = action.payload },
        resetToken: state => { state.token = ''}
    },
    extraReducers: builder => {

    }
})

export const { loadToken, resetToken } = userSlice.actions

export const selectToken = (state: RootState) => state.user.token

export default userSlice.reducer
