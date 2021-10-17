import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem'

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPortfolio } from '../../fetches/portfolio';
import Suggested from './Suggested'
import ListItemText from '@mui/material/ListItemText';
import StockPrice from './StockPrice';
import { ListSubheader } from '@mui/material';
import { useAppSelector } from '../../store/hooks';
import { selectToken } from '../../store/userSlice';

const Portfolio = () => {


  const [ portfolio, setPortfolio ] = useState()
  const token = useAppSelector(selectToken)

  //stop gap until i fix store
   const [prices, setPrices] = useState([])

   useEffect(() => {
     let port;
    (async() => {
      port = await getPortfolio(token);
      setPortfolio(port);
    })();
   }, [token])

   useEffect(() => {
     if (!portfolio) return
     (async() => {
       let portfolioString = portfolio.filter(sec =>sec.Ticker.ticker !== 'CASH').reduce( (acc, ele) => {
         console.log(ele)
         return acc + ',' + ele.Ticker.ticker
       }, "")
       let res = await fetch(`https://sandbox.iexapis.com/stable/tops?symbols=${portfolioString}&token=Tsk_d83ce3387c9b44d99c7060e036faad15`)
       if (res.ok) {
         setPrices(await res.json())
       }
      })()
   }, [portfolio])

  if(!portfolio) {
    return null;
  }

  return (
     <Card>
        <List>
          <ListSubheader>
            Portfolio
          </ListSubheader>
          <Divider variant='middle' />
          {portfolio.filter(sec =>sec.Ticker.ticker !== 'CASH').map( (stock, idx)=> {
            return(

              <ListItem alignItems='center' key={stock.Ticker.ticker} className={'sidebar__ticker-portfolio'}>
                <ListItemText>
                  <Link to={`/assets/${stock.Ticker.ticker}`} className={'link-stocks'}>
                  {stock.Ticker.ticker}
                  </Link>
                </ListItemText>
                {console.log(stock)}
                <StockPrice price={prices[idx]}/>
              </ListItem>
            )
          })}
        <Suggested />
        </List>
      </Card>
  )
};

export default Portfolio;
