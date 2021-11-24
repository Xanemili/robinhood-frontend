import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'
import { fetchPortfolio } from '../fetches/portfolio'
import { IexAsset } from '../api-types'

interface PortfolioList {
  [id: string]: IexAsset
}

type Status = 'loading' | 'failure' | 'success' | 'setup'
export interface PortfolioListSlice {
  data: PortfolioList,
  status: Status
}

const initialState: PortfolioListSlice = { status: 'setup', data: {}}

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: { },
  extraReducers: builder => {
    builder
    .addCase(fetchPortfolio.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(fetchPortfolio.fulfilled, (state, action) => {
      const newPortfolio: PortfolioList = {}
      action.payload.forEach( (position: IexAsset) => {
        newPortfolio[position.symbol] = position
      })
      state.data = newPortfolio
    })
  }
})

// export const { } = portfolioSlice.actions
export const selectPortfolio = (state: RootState) => state.portfolio
export default portfolioSlice.reducer
