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
      state.data[id] = {id, name, description, symbols}
    },
    resetLists: (state: AssetListSlice) => {
      return initialState
    },
    addListItem: (state: AssetListSlice, action) => {
      const { id, symbol } = action.payload
      state.data[id].symbols?.push(symbol)
    },
    removeListItem: (state: AssetListSlice, action) => {
      const { id, symbol } = action.payload
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
    builder
    .addCase(deleteListById.fulfilled, (state, action) => {
      if (action.payload && action.payload.id) {
        delete state.data[action.payload.id]
      }
    })
    .addCase(deleteListById.rejected, (state, action) => {
      state.status = 'failure'
    })
  }
})

export const { loadLists, removeList, addList, loadListFailure, resetLists, loadingLists, addListItem, removeListItem,  } = listSlice.actions

export const selectList = (state: RootState, id: number) => state.lists.data[id]
export const selectLists = (state: RootState) => state.lists

export default listSlice.reducer
