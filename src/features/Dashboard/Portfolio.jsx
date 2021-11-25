import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPortfolio } from '../../fetches/portfolio';
import { selectPortfolio } from '../../store/portfolioSlice';
import ListItemText from '@mui/material/ListItemText';
import StockPrice from './StockPrice';
import { ListSubheader } from '@mui/material';
import { useAppSelector } from '../../store/hooks';
import { selectToken } from '../../store/userSlice';
import { useDispatch } from 'react-redux';


const Portfolio = () => {

  const dispatch = useDispatch()
  const token = useAppSelector(selectToken)
  const portfolio = useAppSelector(selectPortfolio)

   useEffect(() => {
    dispatch(fetchPortfolio())
   }, [token, dispatch])

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
            <ListItem alignItems='center' key={position.symbolId} component={Link} to={`/assets/${position.symbol}`}>
              <ListItemText>
                {position.symbol} - {position.quantity}
              </ListItemText>
              {/* <StockPrice price={prices[idx]}/> */}
            </ListItem>
          )
        })}
      {/* <Suggested /> */}
      </List>
    </Paper>
  )
};

export default Portfolio;
