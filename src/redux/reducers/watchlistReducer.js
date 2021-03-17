import {LOAD_WATCHLIST_FAILURE, ADD_WATCHLIST_ITEM, LOAD_WATCHLIST_SUCCESS} from '../actionTypes'

const watchlistReducer = (state = {}, action) => {
  //currently a reducer for only one list.
  let state_copy = {...state}
  console.log(state_copy)
  switch(action.type) {
    case LOAD_WATCHLIST_FAILURE:
      return state
    case LOAD_WATCHLIST_SUCCESS:
      let refresh_state = action.payload
      return refresh_state
    case ADD_WATCHLIST_ITEM:
      // horrible code: please fix to make more than one modular list
      state_copy.Tickers.push(action.payload)
      return state_copy
    default:
      return state
  }
}

export default watchlistReducer