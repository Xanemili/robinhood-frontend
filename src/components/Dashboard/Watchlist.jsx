import React, {useContext, useEffect} from 'react';
import RobinhoodContext from '../../RobinhoodContext';
import {getWatchlist} from '../../fetches/portfolio';
import { ListSubheader, ListItem, Divider, ListItemText } from '@material-ui/core';
import {Link} from 'react-router-dom'
import StockPrice from './StockPrice'


const Watchlist = () => {

  const {watchlist, setWatchlist, token} = useContext(RobinhoodContext)
  useEffect(() => {
    (async () => {
      const currentWatchlist = await getWatchlist(token);
      if (watchlist !== currentWatchlist) {
        setWatchlist(currentWatchlist);
      }
    })();
  }, [setWatchlist, token])


  return (
    <>
    <Divider variant='middle'/>
      <ListSubheader>
        {watchlist.watchlist ? watchlist.watchlist.name : 'Watchlist'}
      </ListSubheader>
    <Divider variant='middle'/>
      {watchlist.watchlist ? watchlist.watchlist.Tickers.map( ticker => {
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
