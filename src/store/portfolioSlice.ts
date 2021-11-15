import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState: {
    status: 'idle',
  },
  reducers: {
    loadPortfolio: (state, action) => {},
    resetPortfolio: (state, action) => {},
    buyPosition: (state, action) => {},
    sellPosition: (state, action) => {},
  }
})

export const { loadPortfolio, resetPortfolio, buyPosition, sellPosition, } = portfolioSlice.actions

export default portfolioSlice.reducer
