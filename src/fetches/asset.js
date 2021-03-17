import {baseUrl} from '../config';
import {buyPosition} from '../redux/actions'

const getToken = async () => {
  // crude implementation. using for now to ensure store works.
  let token = await window.localStorage.getItem('token')
  return token
}

export const getAssetData = async (asset) => {
  const token = await getToken()
  const res = await fetch(`${baseUrl}/assets/${asset}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if(res.ok) {
    const data = await res.json()
    return data
  } else {
    return [];
  }
};

export const sendTrade = async (data) => {
  const token = await getToken()
  data.price = parseFloat(data.price)
  data.amount = parseFloat(data.amount)

  const response = await fetch (`${baseUrl}/trades/${data.ticker}/${data.orderType}`, {
    method: 'Post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if(response.ok){
    const position = response.json()
    buyPosition(position)
  }
}

export const getTimeSeriesData = async (asset, range, interval) => {
  const token = await getToken()
  const url = `${baseUrl}/assets/timeseries/${asset}/${range}/${interval}`;
  const res = await fetch (url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if(res.ok) {
    const data = await res.json()
    return data
  } 
}

export const getSearch = async(token, search) => {
  if(!search){
    return [];
  }

  const url = `${baseUrl}/assets/search/${search}`
  const res = await fetch(url,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

  if(res.ok) {
    const data = await res.json()
    return data;
  } else {
    return [];
  }
}
