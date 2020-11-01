import React, {useState, useEffect} from 'react'
import { ListItemText } from '@material-ui/core'


const StockPrice = ({ticker}) => {

  const [data, setData] = useState({})
  const [currentTicker, setCurrentTicker] = useState('')

  useEffect(()=> {
    let security;
    (async() => {
      security = await fetch(`https://api.polygon.io/v2/aggs/ticker/${ticker}/prev?apiKey=0sXWlN4BphrsPZEVMC1cWUKxM5lHx53z`)
      let parsed = await security.json()
      if(ticker !== currentTicker && parsed.status === 'OK'){
        setCurrentTicker(ticker)
        setData(parsed.results[0]);
      }
    })();

  })

  return (
    <>
    {data ?
      <ListItemText
      primary={data.c ? `$ ${(data.c).toFixed(2)}` : 0}
      secondary={data.c ? `${(((data.c / data.o) - 1) * 100).toFixed(2)}%` : 0}
      >
      </ListItemText> : <></>
    }
    </>
  )
}

export default StockPrice;
