import React, { useEffect, Suspense } from 'react';
import {getWatchlist} from '../../fetches/portfolio';
import { CircularProgress } from '@material-ui/core';
import { useAppSelector } from '../../hooks';
import { selectToken } from '../../store/userSlice';
import ErrorBoundary from '../ErrorBoundary';


const List = () => {

  const [ lists, setLists ] = React.useState([ {name: '', Tickers: []}])
  const token = useAppSelector(selectToken)

  useEffect(() => {
    (async () => {
      const currentList = await getWatchlist(token);
      setList(currentList);
    })();
  }, [setList, token])


  return (
    <ErrorBoundary fallback={<h2>Could not fetch watchlist </h2>}>
      <Suspense fallback={<CircularProgress />}>

      </Suspense>
    </ErrorBoundary>
  )
}

export default List;
