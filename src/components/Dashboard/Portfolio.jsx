import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'
import React, { useEffect} from 'react';
import { Link } from 'react-router-dom';
import { getPortfolio } from '../../fetches/portfolio';
import Watchlist from './Watchlist'
import ListItemText from '@material-ui/core/ListItemText';
import StockPrice from './StockPrice';
import { ListSubheader } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';


const Portfolio = () => {

  //stop gap until i fix store
  const portfolio = useSelector(state => state.portfolio)
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      await dispatch(getPortfolio);   
    })();
  }, [dispatch])

  useEffect(() => {
    (async () => {
      let portfolioString = Object.keys(portfolio).filter(sec => sec !== 'CASH').reduce((acc, ele) => {
        return acc + ',' + ele
      }, "")
      let res = await fetch(`https://sandbox.iexapis.com/stable/tops?symbols=${portfolioString}&token=Tsk_d83ce3387c9b44d99c7060e036faad15`)
      if (res.ok) {
        let prices = await res.json()
        console.log(prices)
      }
    })()
  }, [portfolio, dispatch])

  if (!portfolio) {
    return null;
  }

  return (
      <List>
        <ListSubheader>
          Portfolio
          </ListSubheader>
        <Divider variant='middle' />
        {Object.keys(portfolio).map((stock, idx) => {
          return (
            <ListItem alignItems='center' key={stock} className={'sidebar__ticker-portfolio'}>
              <ListItemText>
                <Link to={`/assets/${stock}`} className={'link-stocks'}>
                  {stock}
                </Link>
              </ListItemText>
              <ListItemText>
                {portfolio[stock].amount}
              </ListItemText>
              <StockPrice price={0} />
            </ListItem>
          )
        })}
        <Watchlist />
        {/* <Suggested /> */}
      </List>
  )
};

export default Portfolio;
