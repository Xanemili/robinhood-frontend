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
