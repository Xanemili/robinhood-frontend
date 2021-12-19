import { baseUrl } from '../config'
import { AssetListType } from '../store/listSlice'
import { createAsyncThunk } from '@reduxjs/toolkit'
import store from '../store/store'
import { loadLists, loadListFailure, resetLists, loadingLists, addList, addListItem as addItem, removeListItem } from '../store/listSlice'
import { createAlert } from '../store/alertSlice'

export const getLists = async () => {
  const token = localStorage.getItem('token')
  store.dispatch(loadingLists())

  const res = await fetch(`${baseUrl}/list`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (res.ok) {
    const lists = await res.json()
    if (lists && Object.keys(lists).length > 0) {
      store.dispatch(loadLists(lists))
      store.dispatch(createAlert({ message: 'Lists Loaded', type: 'success'}))
    } else {
      store.dispatch(resetLists())
    }
  } else {
    store.dispatch(loadListFailure())
  }
}

export const deleteListItem = async (id: Number, symbol: string) => {

  const token = localStorage.getItem('token')
  const res = await fetch(`${baseUrl}/list/${id}/${symbol}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (res.ok) {
    let data = await res.json()
    store.dispatch(removeListItem({ id: data.id, symbol: data.symbol }))
  } else {
    store.dispatch(loadListFailure())
  }
}

export const addListItem = async (id: string, symbol: string) => {

  const token = localStorage.getItem('token')
  const res = await fetch(`${baseUrl}/list/${parseInt(id)}/${symbol}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (res.ok) {
    let data = await res.json()
    store.dispatch(addItem({id, symbol: data }))
  } else {
    store.dispatch(loadListFailure())
  }
}

export const createList = async (data: AssetListType) => {

  const token = localStorage.getItem('token')

  const res = await fetch(`${baseUrl}/list/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })

  if (res.ok) {
    const newList = await res.json()
    store.dispatch(addList(newList))
    store.dispatch(createAlert({message: 'Success: List was created', alertType: 'success'}))
  } else {
    store.dispatch(loadListFailure())
  }
}

export const deleteListById = createAsyncThunk('lists/deleteListById', async (listId: number, thunkAPI) => {
  const token = localStorage.getItem('token')
  const response = await fetch(`${baseUrl}/list/${listId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const data = await response.json()
  return data
})

// export const loadLists = createAsyncThunk<AssetListType, number>('lists/loadLists', async (id: number) => {
//   const token = localStorage.getItem('token')

//   const res = await fetch(`${baseUrl}/list`, {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   });

//   return (await res.json()) as AssetListType
// })

export const getMovers = async() => {
  const token = localStorage.getItem('token')

  const res = await fetch(`${baseUrl}/assets/movers`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if(res.ok) {
    const data = await res.json()
    return data
  } else {
    return { gainers: [], losers: []}
  }
}
