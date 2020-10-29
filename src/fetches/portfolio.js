import {baseUrl} from '../config';

export const getPortfolio = async (token) => {
  const res = await fetch(`${baseUrl}/users/portfolio`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if(res.ok) {
    const portfolio = await res.json()
    return portfolio.portfolio
  } else {
    return [];
  }
};
