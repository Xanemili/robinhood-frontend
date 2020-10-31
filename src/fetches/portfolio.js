import {baseUrl} from '../config';

export const getPortfolio = async (token) => {
  const res = await fetch(`${baseUrl}/users/portfolio`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  let tickerList = await res.json()

  tickerList.portfolio.filter(security => security.Ticker.ticker !== 'CASH').forEach( async(security) => {
    const pricing = await fetch(`https://api.polygon.io/v2/aggs/ticker/${security.Ticker.ticker}/prev?apiKey=0sXWlN4BphrsPZEVMC1cWUKxM5lHx53z`)
    let waitpricing = await pricing.json();
    security.data = waitpricing
  })

  if(res.ok) {
    return tickerList;
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
