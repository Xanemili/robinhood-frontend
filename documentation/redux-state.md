```javascript
{
  user: {
    name: string,
    email: string,
    userId: id
  },
  tickers: {
    [tickerId]: {id: int, ticker: string, price: float, {...(historical dates w/ prices)}},
    allTickers : [ticker1, ticker2, ...tickers]
  },
  portfolio: {
    [tickerId]: {id: tickerId}
  }
  watchList: {
    [tickerId]: {id: tickerId},
  },
  errors: {

  }
}
```
