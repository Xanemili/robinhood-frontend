import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import alertReducer from './alertSlice'
import listReducer from './listSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        alerts: alertReducer,
        lists: listReducer,
    }
}, )

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
