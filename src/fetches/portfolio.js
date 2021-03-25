import {baseUrl} from '../config';
import {LOAD_POSITIONS_SUCCESS, LOAD_POSITIONS_FAILURE, LOAD_WATCHLIST_SUCCESS, ADD_WATCHLIST_ITEM, REMOVE_WATCHLIST_ITEM, LOAD_WATCHLIST_FAILURE, BUY_POSITION} from '../redux/actionTypes'


const getToken = async () => {
  // crude implementation. using for now to ensure store works.
  let token = await window.localStorage.getItem('token')
  return token
}

export const getPortfolio = async (dispatch, getState) => {
  
  const token = await getToken()
  const res = await fetch(`${baseUrl}/users/portfolio`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  let type = LOAD_POSITIONS_SUCCESS
  if (!res.ok) {
    type = LOAD_POSITIONS_FAILURE
  }
  let tickerList = await res.json()
  dispatch({type, payload: tickerList})
};

export const getWatchlist = async(dispatch, getState) => {
  // crude implementation. using for now to ensure store works.
  const token = await getToken()
  const res = await fetch(`${baseUrl}/watchlist`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  let type = LOAD_WATCHLIST_FAILURE
  if(res.ok) {
    type = LOAD_WATCHLIST_SUCCESS
  }
  let watchlist = await res.json()
  dispatch({type, payload: watchlist})
}

export const getPortfolioHistory = async() => {
  const token = await getToken()
  const res = await fetch(`${baseUrl}/users/portfolio/history`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if(res.ok) {
    return res.json()
  } else {
    return [];
  }
}

export const deleteListItem = (security) => async(dispatch, getState) => {
  const token = await getToken()
  const res = await fetch(`${baseUrl}/watchlist/security/${security}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if(res.ok){
    dispatch({type: REMOVE_WATCHLIST_ITEM, payload: await res.json()})
  }
  dispatch({type: LOAD_WATCHLIST_FAILURE})
}

export const addItemToList = (security) => async (dispatch, getState) => {
  const token = await getToken()
  const res = await fetch(`${baseUrl}/watchlist/security/${security}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (res.ok) {
    dispatch({type: ADD_WATCHLIST_ITEM, payload: await res.json()})
  } else {
    dispatch({type: LOAD_WATCHLIST_FAILURE})
  }
}

export const addCash = async (dispatch, getState) => {
  const token = await getToken()
  const url = `${baseUrl}/trades/cash`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (res.ok) {
    dispatch({type: BUY_POSITION, payload: await res.json()})
  } 
}

export const getCash = async(token) => {

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
