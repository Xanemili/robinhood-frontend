import React, { useState, useEffect, useContext } from 'react';
import RobinhoodContext from '../../RobinhoodContext';
import { ListSubheader, ListItem, Divider, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom'
import StockPrice from './StockPrice'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import {addItemToList} from '../../fetches/portfolio'


const Suggested = () => {

  const [suggested, setSuggested] = useState(['AAPL','MSFT','F','K'])
  const [addItem, setAddItem] = useState()

  const {token} = useContext(RobinhoodContext)

  useEffect(()=> {
    if(addItem){
      (async()=> {
        const addtoList = await addItemToList(token, addItem)

      })();
    }
  },[addItem, token])

  return (
    <>
      <Divider />
      <ListSubheader>
        Suggested
      </ListSubheader>
      <Divider variant='middle' />
      {suggested.map( (ticker, idx) => {
        return (
          <ListItem alignItems='center' key={ticker} className={'sidebar__ticker-portfolio'}>
            <ListItemText>
              <Link to={`/assets/${ticker}`} className={'link-stocks'}>
                {ticker}
              </Link>
            </ListItemText>
            <StockPrice ticker={ticker} />
            <RemoveCircleIcon onClick={()=>setAddItem(ticker)}/>
          </ListItem>
        )
      })}
    </>
  )
}

export default Suggested;
