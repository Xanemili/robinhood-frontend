import {baseUrl} from '../config';

export const getPortfolio = async (token) => {
  const res = await fetch(`${baseUrl}/users/portfolio`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  let tickerList = await res.json()

  const getPricing = item => {
    return Promise.resolve()
  }

  let tickerAndPricing = tickerList.portfolio.filter(security => security !== 'CASH').map( async(security) => {
    const pricing = await fetch(`https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${security.Ticker.ticker}?apiKey=0sXWlN4BphrsPZEVMC1cWUKxM5lHx53z`)
    let waitpricing = await pricing.json();
    return waitpricing
  })

  let getData = await Promise.all(tickerAndPricing)


  if(res.ok) {
    return getData
  } else {
    return [];
  }
};
