import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'
import { fetchPortfolio, sendPortfolioTrade } from '../fetches/portfolio'
import { IexAsset } from '../api-types'

interface PortfolioList {
  [id: string]: IexAsset
}

interface Position extends IexAsset {
  quantity: Number
}

type Status = 'loading' | 'failure' | 'success' | 'setup'
export interface PortfolioListSlice {
  data: PortfolioList,
  total: Number,
  status: Status
}

const initialState: PortfolioListSlice = { status: 'setup', total: 0.00, data: {}}

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    updatePrice: (state: PortfolioListSlice, action) => {
      state.data[action.payload?.symbol].latestPrice = action.payload.latestPrice
    },
   },
  extraReducers: builder => {
    builder
    .addCase(fetchPortfolio.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(fetchPortfolio.fulfilled, (state, action) => {
      const newPortfolio: PortfolioList = {}
      action.payload.forEach( (position: Position) => {
        newPortfolio[position.symbol] = position
      })
      state.data = newPortfolio
      state.status = 'success'
    })
    .addCase(sendPortfolioTrade.fulfilled, (state, action) => {
      const { position } = action.payload
      state.data[position.symbol] = position
    })
    .addCase(sendPortfolioTrade.pending, (state, action) => {
      state.status = 'loading'
    })
  }
})

export const { updatePrice } = portfolioSlice.actions
export const selectPortfolio = (state: RootState) => state.portfolio
export default portfolioSlice.reducer
