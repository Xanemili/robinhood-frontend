import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'

export type AssetListType = {
  id: number,
  name?: string,
  Tickers: Array<Ticker>,
}

type AssetLists = {
  [id: number]: AssetListType
}

type Ticker = {
  id: number,
  ticker: string,
}

const initialState: AssetLists = { 0: { id: 0, name: '', Tickers: [] } }

export const listSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    loadLists: (state: AssetLists, action) => { state = action.payload },
    removeList: (state: AssetLists, action) => { delete state[action.payload.id]}
  }
})

export const { loadLists, removeList } = listSlice.actions

export const selectList = (state: RootState, id: number) => state.lists[id]

export default listSlice.reducer
