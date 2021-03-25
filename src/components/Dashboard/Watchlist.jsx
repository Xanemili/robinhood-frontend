import React, {useEffect} from 'react';
import {getWatchlist} from '../../fetches/portfolio';
import { ListSubheader, ListItem, Divider, ListItemText } from '@material-ui/core';
import {Link} from 'react-router-dom'
import StockPrice from './StockPrice'
import { useDispatch, useSelector} from 'react-redux';

const Watchlist = () => {

  const watchlist = useSelector(state => state.watchlist)
  const dispatch = useDispatch()
  useEffect(() => {
    (async () => {
      await dispatch(getWatchlist);
    })();
  }, [dispatch])

  return (
    <>
    <Divider variant='middle'/>
      <ListSubheader>
        {watchlist.name ? watchlist.name : 'Watchlist'}
      </ListSubheader>
    <Divider variant='middle'/>
      {Object.keys(watchlist).length !== 0 ? watchlist.Tickers.map( ticker => {
        return (
          <ListItem alignItems='center' key={ticker.ticker} className={'sidebar__ticker-portfolio'}>
            <ListItemText>
              <Link to={`/assets/${ticker.ticker}`} className={'link-stocks'}>
                {ticker.ticker}
              </Link>
            </ListItemText>
            <StockPrice ticker={ticker.ticker} />
          </ListItem>
        )
      }) : <div />}
    </>
  )
}

export default Watchlist;
