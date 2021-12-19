import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPortfolio } from '../../fetches/portfolio';
import { selectPortfolio, updatePrice } from '../../store/portfolioSlice';
import ListItemText from '@mui/material/ListItemText';
import { ListSubheader } from '@mui/material';
import { useAppSelector } from '../../store/hooks';
import { useDispatch } from 'react-redux';

const Portfolio = () => {

  const dispatch = useDispatch()
  const portfolio = useAppSelector(selectPortfolio)

   useEffect(() => {
    dispatch(fetchPortfolio())
   }, [dispatch])

    useEffect(() => {

    const portfolioSymbols = Object.keys(portfolio.data).filter( x => x !== 'CASH' ).join(',')

    if(!portfolioSymbols) return
    // temporary stop gap for sse to show stock price data.
      const sse = new EventSource(`https://sandbox-sse.iexapis.com/stable/stocksUSNoUTP?token=Tpk_a6c83915bfff43b8b105e39c8b490a97&symbols=${portfolioSymbols}`)

    sse.onmessage = e => {
      const [ data ] = JSON.parse(e.data)
      if (data) {
        dispatch(updatePrice({ symbol: data.symbol, latestPrice: data.latestPrice }))
      } else {
        sse.close()
      }
    }

    sse.onerror = () => {
      console.log('error')
      sse.close()
    }

    return () => {
      sse.close()
    }
  }, [dispatch, portfolio])

  if(!portfolio) {
    return null;
  }

  return (
    <Paper>
      <List>
        <ListSubheader>
          Portfolio
        </ListSubheader>
        <Divider variant='middle' />
        {Object.keys(portfolio.data).length > 0 && Object.values(portfolio.data).map( position=> {
          return(
            <ListItemButton alignItems='center' key={position.symbolId} component={Link} to={`/assets/${position.symbol}`}>
              <ListItemText>
                <Typography color='white'>
                  {position.symbol} - {parseFloat(position.quantity, 2).toFixed(2)} -
                  {parseFloat(position.latestPrice).toFixed(2)}
                </Typography>
              {/* <StockPrice price={prices[idx]}/> */}
              </ListItemText>
            </ListItemButton>
          )
        })}
      {/* <Suggested /> */}
      </List>
    </Paper>
  )
};

export default Portfolio;
