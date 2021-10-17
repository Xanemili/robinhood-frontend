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

export const getPortfolioHistory = async(token) => {

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


export const addCash = async(token) => {
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
