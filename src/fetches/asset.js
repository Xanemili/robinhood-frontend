import {baseUrl} from '../config';
import store from '../store/store'

export const getAssetData = async (asset) => {

  const token = localStorage.getItem('token')
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

export const sendTrade = async (token, data) => {
  data.price = parseFloat(data.price)
  data.quantity = parseFloat(data.quantity)

  const response = await fetch (`${baseUrl}/trades/${data.orderType}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if(response.ok){
    store.dispatch()
  }
}

export const getTimeSeriesData = async (token, asset, range, interval) => {
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
      console.log(data)
    return data;
  } else {
    return [];
  }
}
