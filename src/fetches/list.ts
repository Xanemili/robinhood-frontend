import { baseUrl } from '../config'
import {AssetListType, removeList} from '../store/listSlice'
import { createAsyncThunk } from '@reduxjs/toolkit'
import store from '../store/store'
import { loadLists, loadListFailure, resetLists, loadingLists, addList, addListItem as addItem, removeListItem } from '../store/listSlice'
import { createAlert } from '../store/alertSlice'

export const getLists = async (token: string) => {

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
      store.dispatch(createAlert({payload: { id: 10, message: 'New List Successful', type: 'success'}}))
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
    console.log(data)
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
    store.dispatch(addItem({ symbol: data }))
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


// TO DO: Implement as a thunk!
export const deleteList = async (id: number) => {
  const token = localStorage.getItem('token')

  const res = await fetch(`${baseUrl}/list/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if(res.ok) {
    store.dispatch(removeList(id))
  } else {
    store.dispatch(loadListFailure())
  }
}

export const deleteListById = createAsyncThunk('lists/deleteListById', async (listId: number, thunkAPI) => {
  const response = await deleteList(listId)
  return response
})

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
