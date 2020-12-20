import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'

import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getPortfolio } from '../../fetches/portfolio';
import RobinhoodContext from '../../RobinhoodContext';
import Watchlist from './Watchlist'
import Suggested from './Suggested'
import ListItemText from '@material-ui/core/ListItemText';
import StockPrice from './StockPrice';
import { ListSubheader } from '@material-ui/core';

const Portfolio = () => {

   const {portfolio, setPortfolio, token} = useContext(RobinhoodContext);

   useEffect(() => {
     let port;
    (async() => {
      port = await getPortfolio(token);
      setPortfolio(port);
    })();
   }, [setPortfolio, token])

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
                <StockPrice ticker={stock.Ticker.ticker}/>
              </ListItem>

            )
          })}
        <Watchlist />
        <Suggested />
        </List>
      </Card>
  )
};

export default Portfolio;
