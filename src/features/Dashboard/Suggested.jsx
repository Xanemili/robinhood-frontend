import React, { useState, } from 'react';
import { ListSubheader, ListItem, Divider, ListItemText } from '@material-ui/core';
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
      {suggested.map( (ticker, idx) => {
        return (
          <ListItem alignItems='center' key={ticker} className={'sidebar__ticker-portfolio'}>
            <ListItemText>
              <Link to={`/assets/${ticker}`} className={'link-stocks'} style={{textDecoration: 'none', color: 'inherit'}}>
                {ticker}
              </Link>
            </ListItemText>
              <StockPrice ticker={ticker} />
          </ListItem>
        )
      })}
    </>
  )
}

export default Suggested;
