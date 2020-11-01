import {baseUrl} from '../config';

export const getAssetData = async (token, asset) => {
  const res = await fetch(`${baseUrl}/assets/${asset}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if(res.ok) {
    const data = await res.json()
    console.log(data)
    return data
  } else {
    return [];
  }
};

export const sendTrade = async (token, data) => {
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

export const getHistoricalAssetData = async (token, asset, dateRange) => {
  const url = `${baseUrl}/assets/${asset}/historical/` + dateRange[0] + `/` + dateRange[1];
  const res = await fetch (url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if(res.ok) {
    const data = await res.json()
    return data
  } else {
    return []
  }
}
