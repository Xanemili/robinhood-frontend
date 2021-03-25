import {BUY_POSITION, LOAD_POSITIONS_SUCCESS, LOAD_PORTFOLIO_HISTORY} from './actionTypes'

export const buyPosition = asset => ({
  type: BUY_POSITION,
  payload: {
    asset
  }
})

export const loadPositions = assets => ({
  type: LOAD_POSITIONS_SUCCESS,
  payload: assets
})

export const loadPortfolioChart = history => ({
  type: LOAD_PORTFOLIO_HISTORY,
  payload: history
})