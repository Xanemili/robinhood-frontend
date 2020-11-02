import React, { useState, useEffect, useContext } from 'react';
import RobinhoodContext from '../../RobinhoodContext';
import { ListSubheader, ListItem, Divider, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom'
import StockPrice from './StockPrice'
// import AddCircleIcon from '@material-ui/icons/AddCircle';
// import {addItemToList} from '../../fetches/portfolio'


const Suggested = () => {

  const [suggested] = useState(['AAPL','MSFT','F','K', 'WFC', 'MS', 'TSLA', 'GE', 'LLY'])
  const [addItem] = useState()

  const {token} = useContext(RobinhoodContext)

  useEffect(()=> {
    if(addItem){
      (async()=> {
        // const addtoList = await addItemToList(token, addItem)
        // if(addtoList){

        // }
      })();
    }
  },[addItem, token])

  return (
    <>
      <Divider variant='middle'/>
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
                {/* <AddCircleIcon onClick={()=> {
                  setAddItem(ticker)
                  //implement custom reducer
                }} color='secondary'/> */}
          </ListItem>
        )
      })}
    </>
  )
}

export default Suggested;
