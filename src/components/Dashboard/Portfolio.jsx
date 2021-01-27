import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'

import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPortfolio } from '../../fetches/portfolio';
import RobinhoodContext from '../../RobinhoodContext';
import Watchlist from './Watchlist'
import Suggested from './Suggested'
import ListItemText from '@material-ui/core/ListItemText';
import StockPrice from './StockPrice';
import { ListSubheader } from '@material-ui/core';

const Portfolio = () => {

  const { portfolio, setPortfolio, token } = useContext(RobinhoodContext);
  //stop gap until i fix store
  const [prices, setPrices] = useState([])

  useEffect(() => {
    let port;
    (async () => {
      port = await getPortfolio(token);
      setPortfolio(port);
    })();
  }, [setPortfolio, token])

  useEffect(() => {
    if (!portfolio) return
    (async () => {
      let portfolioString = portfolio.filter(sec => sec.Ticker.ticker !== 'CASH').reduce((acc, ele) => {
        return acc + ',' + ele.Ticker.ticker
      }, "")
      let res = await fetch(`https://sandbox.iexapis.com/stable/tops?symbols=${portfolioString}&token=Tsk_d83ce3387c9b44d99c7060e036faad15`)
      if (res.ok) {
        let newPrices = await res.json()
        setPrices(newPrices)
        console.log(newPrices)
      }
    })()
  }, [portfolio])

  if (!portfolio) {
    return null;
  }

  return (
    <Card>
      <List>
        <ListSubheader>
          Portfolio
          </ListSubheader>
        <Divider variant='middle' />
        {portfolio.map((stock, idx) => {
          return (
            <ListItem alignItems='center' key={stock.Ticker.ticker} className={'sidebar__ticker-portfolio'}>
              <ListItemText>
                <Link to={`/assets/${stock.Ticker.ticker}`} className={'link-stocks'}>
                  {stock.Ticker.ticker}
                </Link>
              </ListItemText>
              <ListItemText>
                qty {stock.amount}
              </ListItemText>
              <StockPrice price={prices[idx]} />
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
