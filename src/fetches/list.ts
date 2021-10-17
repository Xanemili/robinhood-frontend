import { baseUrl } from '../config'
import {Ticker, AssetListType} from '../store/listSlice'
import store from '../store/store'
import { loadLists } from '../store/listSlice'
import { createAlert } from '../store/alertSlice'

export const getLists = async (token: string) => {

  const res = await fetch(`${baseUrl}/list`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (res.ok) {
    const lists = await res.json()
    store.dispatch(loadLists(lists))
    store.dispatch(createAlert({payload: { id: 10, message: 'New List Successful', type: 'success'}}))
  } else {
    return [];
  }
}

export const deleteListItem = async (token: string, id: Number, security: Ticker) => {

  const res = await fetch(`${baseUrl}/list/${id}/security/${security}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (res.ok) {
    return res.json()
  } else {
    return 'There was an error'
  }
}

export const addListItem = async (token: string, id: string, security: Ticker) => {

  const res = await fetch(`${baseUrl}/list/${id}/security/${security}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (res.ok) {
    return res.json()
  } else {
    return 'There was an error'
  }
}

export const createList = async (token: string, data: AssetListType) => {
  const res = await fetch(`${baseUrl}/list/new`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })

  if (res.ok) {
    return res.json()
  } else {
    return 'There was an error'
  }
}
