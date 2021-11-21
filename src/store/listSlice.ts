import { createSlice } from '@reduxjs/toolkit'
import { IexAsset } from '../api-types'
import { RootState } from './store'
import { deleteListById } from '../fetches/list'

export type AssetListData = {
  [id: string]: AssetListType
}

export type AssetListType = {
  id: number,
  name?: string,
  description?: string,
  symbols?: Array<IexAsset>
}

type Status = 'loading' | 'failure' | 'success' | 'setup'

type AssetListSlice = {
  data: AssetListData,
  status: Status
}

const initialState: AssetListSlice = { status: 'setup', data: {}}

export const listSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    loadLists: (state: AssetListSlice, action) => {
      state.data = action.payload
      state.status = 'success'
      return state
    },
    removeList: (state: AssetListSlice, action) => {
      delete state.data[action.payload]
    },
    addList: (state: AssetListSlice, action) => {
      const {id, name, description, symbols } = action.payload
      state.data[name] = {id, name, description, symbols}
      console.log(state.data)
    },
    resetLists: (state: AssetListSlice) => {
      return initialState
    },
    addListItem: (state: AssetListSlice, action) => {
      const { id, symbol } = action.payload
      const { data } = state
      console.log(data)
      state.data[id].symbols?.push(symbol)
      return state
    },
    removeListItem: (state: AssetListSlice, action) => {
      const { id, symbol } = action.payload
      console.log(state.data)
      if (state.data[id]) {
        state.data[id].symbols = state.data[id].symbols?.filter( x => x.id !== symbol.id)
      }
    },
    loadingLists: (state: AssetListSlice) => {
      state.status = 'loading'
      return state
    },
    loadListFailure: (state: AssetListSlice) => {
      state.status = 'failure'
      return state
    }
  }, extraReducers: (builder) => {
    builder.addCase(deleteListById.fulfilled, (state, action) => {
      console.log(action.payload)
      // delete state.data[action.payload]
    })
  }
})

export const { loadLists, removeList, addList, loadListFailure, resetLists, loadingLists, addListItem, removeListItem,  } = listSlice.actions

export const selectList = (state: RootState, id: number) => state.lists.data[id]
export const selectLists = (state: RootState) => state.lists

export default listSlice.reducer
