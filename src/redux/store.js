import { combineReducers, createStore, applyMiddleware } from 'redux'
import portfolioReducer from './reducers/portfolioReducer'
import portfolioChartReducer from './reducers/portfolioChartReducer'
import watchlistReducer from './reducers/watchlistReducer'
import { composeWithDevTools} from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

const rootReducer = combineReducers({
  portfolio: portfolioReducer,
  portfolioChart: portfolioChartReducer,
  watchlist: watchlistReducer
})

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware
  // .withExtraArgument({
  // apiFetch: getApiFetcher(() => {
  //   store.dispatch(doLogout())
  // })})
))

const store = createStore(rootReducer, composedEnhancer)

export default store

