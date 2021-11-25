import { configureStore, createSerializableStateInvariantMiddleware,  } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import alertReducer from './alertSlice'
import listReducer from './listSlice'
import portfolioReducer from './portfolioSlice'

const serializableMiddleware = createSerializableStateInvariantMiddleware({
    ignoredActionPaths: ['alerts.dialog', 'payload.action'],
    ignoredActions: ['alerts.dialog.openDialog'],
    ignoredPaths: ['alerts.dialog'],
})

const store = configureStore({
    reducer: {
        user: userReducer,
        alerts: alertReducer,
        lists: listReducer,
        portfolio: portfolioReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(serializableMiddleware)
}, )

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
