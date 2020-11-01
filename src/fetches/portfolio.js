import {baseUrl} from '../config';

export const getPortfolio = async (token) => {
  const res = await fetch(`${baseUrl}/users/portfolio`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  let tickerList = await res.json()

  if(res.ok) {
    return tickerList.portfolio;
  } else {
    return [];
  }
};

export const getWatchlist = async(token) => {
  const res = await fetch(`${baseUrl}/watchlist`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if(res.ok) {
    return res.json()
  }  else {
    return [];
  }
}

export const getPortfolioHistory = async(token) => {
  const res = await fetch(`${baseUrl}/users/history`, {
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

export const deleteListItem = async(token, security) => {
  const res = await fetch(`${baseUrl}/api/watchlist/${security}/MSFT`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if(res.ok){
    return res.json()
  } else {
    return 'There was an error'
  }
}

export const addItemToList = async (token, security) => {

  console.log(token, security)
  const res = await fetch(`${baseUrl}/watchlist/security/${security}`, {
    method: 'POST',
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
