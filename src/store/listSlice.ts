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

export type Ticker = {
  id: number,
  ticker: string,
}

const initialState: AssetLists = {}

export const listSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    loadLists: (state: AssetLists, action) => {
      state = action.payload
      return state
    },
    removeList: (state: AssetLists, action) => {
      delete state[action.payload.id]
      return state
    },
    addList: (state: AssetLists, action) => {
      state[action.payload.id] = action.payload.list
      return state
    },
    resetLists: (state: AssetLists, action) => {
      return initialState
    },
    addToList: (state: AssetLists, action) => {


      return state
    }
  }
})

export const { loadLists, removeList, addList } = listSlice.actions

export const selectList = (state: RootState, id: number) => state.lists[id]
export const selectLists = (state: RootState) => state.lists

export default listSlice.reducer
