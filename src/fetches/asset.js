import {baseUrl} from '../config';

export const getAssetData = async (token, asset) => {
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
    return true;
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
    return data;
  } else {
    return [];
  }
}
