import {BUY_POSITION, SELL_POSITION, LOAD_POSITIONS_SUCCESS, UPDATE_PRICES} from '../actionTypes'

const portfolioReducer = (state = {}, action) => {
  let state_copy = {...state}
  switch (action.type) {
    case BUY_POSITION:
      if (state_copy[action.ticker]) state_copy[action.ticker] = state_copy[action.ticker] + action.quantity
      else state_copy[action.ticker] = action.quantity
      return state_copy
    case SELL_POSITION:
      if (state_copy[action.ticker] >= action.quantity){
        state_copy[action.ticker] = state_copy[action.ticker] - action.quantity
      }
      return state_copy
    case LOAD_POSITIONS_SUCCESS:
      let refresh_state = {}
      for (const ticker of action.payload) {
        refresh_state[ticker.Ticker.ticker] = {ticker: ticker.Ticker.ticker, amount: ticker.amount, total: ticker.total}
      }
      return refresh_state
    case UPDATE_PRICES:
      return refresh_state
    default:
      return state
  }
}

export default portfolioReducer