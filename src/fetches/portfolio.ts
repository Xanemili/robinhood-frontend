import {baseUrl} from '../config';
import { createAsyncThunk } from '@reduxjs/toolkit'

type Trade = {
  price: number | undefined
  quantity: number
  orderType: 'buy' | 'sell'
  symbol: string
}

export const fetchPortfolio = createAsyncThunk('portfolio/fetchPortfolio', async () => {
  const token = localStorage.getItem('token')
  const res = await fetch(`${baseUrl}/users/portfolio`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if(res.ok) {
    const data = await res.json()
    return data
  } else {
    return Promise.reject()
  }
})

export const sendPortfolioTrade = createAsyncThunk('portfolio/sendPortfolioTrade', async(data: Trade, thunkAPI) => {
  const token = localStorage.getItem('token')
  console.log(thunkAPI)
  let trade = {
    price: data.price,
    quantity: data.quantity,
    symbol: data.symbol,
    orderType: data.orderType
  }

  const res = await fetch(`${baseUrl}/trades/${data.orderType}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(trade),
  });

  if (res.ok) {
    const data = await res.json()
    return data
  } else {
    return Promise.reject()
  }
})

export const getPortfolioHistory = async(token: string) => {

  const res = await fetch(`${baseUrl}/users/portfolio/history`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if(res.ok) {
    const data = await res.json()
    return data
  } else {
    return;
  }
}


export const addCash = async(token: string) => {
  const url = `${baseUrl}/trades/cash`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (res.ok) {
    const data = await res.json()
    return data;
  } else {
    return [];
  }
}

export const getCash = async(token: string) => {

  const url = `${baseUrl}/users/cash`
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (res.ok) {
    const data = await res.json()
    return data
  } else {
    return {};
  }

}
