import React, { useState, } from 'react';
import { ListSubheader, ListItem, Divider, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom'
import StockPrice from './StockPrice'

const Suggested = () => {

  const [suggested] = useState([])

  return (
    <>
      <ListSubheader>
        Suggested
      </ListSubheader>
      <Divider variant='middle' />
      {suggested.map( (symbol, idx) => {
        return (
          <ListItem alignItems='center' key={symbol}>
            <ListItemText>
              <Link to={`/assets/${symbol}`} className={'link-stocks'} style={{textDecoration: 'none', color: 'inherit'}}>
                {symbol}
              </Link>
            </ListItemText>
              <StockPrice symbol={symbol} />
          </ListItem>
        )
      })}
    </>
  )
}

export default Suggested;
