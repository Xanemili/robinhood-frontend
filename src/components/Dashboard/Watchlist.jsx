import React, {useContext, useEffect} from 'react';
import RobinhoodContext from '../../RobinhoodContext';
import {getWatchlist} from '../../fetches/portfolio';

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

  console.log(watchlist)
  return (
    <div>

    </div>
  )
}

export default Watchlist;
