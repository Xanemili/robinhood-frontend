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
