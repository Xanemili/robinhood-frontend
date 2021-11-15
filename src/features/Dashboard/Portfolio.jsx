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
    (async() => {
      let port = await getPortfolio(token);
      setPortfolio(port);
    })();
   }, [token])

   useEffect(() => {
     if (!portfolio) return
     (async() => {
       let portfolioString = portfolio.filter(position => position !== 'CASH').reduce( (acc, ele) => {
         console.log(ele)
         return acc + ',' + ele.symbol
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
          {portfolio.map( (position, idx)=> {
            return(
              <ListItem alignItems='center' key={position.symbolId} className={'sidebar__ticker-portfolio'}>
                <ListItemText>
                  <Link to={`/assets/${position.symbol}`} className={'link-stocks'}>
                  {position.symbol}
                  </Link>
                </ListItemText>
                {/* <StockPrice price={prices[idx]}/> */}
              </ListItem>
            )
          })}
        <Suggested />
        </List>
      </Card>
  )
};

export default Portfolio;
