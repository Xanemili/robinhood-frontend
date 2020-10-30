import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText';

import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { getPortfolio } from '../../fetches/portfolio';
import RobinhoodContext from '../../RobinhoodContext';

const Portfolio = () => {

   const { token } = useContext(RobinhoodContext);
   const {portfolio, setPortfolio} = useContext(RobinhoodContext);

   useEffect(() => {
    (async() => {
      const currentPortfolio = await getPortfolio(token);
      if(portfolio !== currentPortfolio){
        setPortfolio(currentPortfolio);
      }
    })()
   }, [setPortfolio])

  if(!portfolio) {
    return null;
  }

  return (
      <Card>
        <List>
      {portfolio.filter(sec => sec.ticker.ticker !== 'CASH').map( (stock, idx)=> {
        return(
          <>
            <ListItem alignItems='center' key={stock.ticker.ticker}>
              <NavLink  to={`/assets/${stock.ticker.ticker}`}>
                <div>
                  <span>
                  {stock.ticker.ticker}
                  </span>
                  <span>{stock.ticker.lastQuote.p}</span>
                  <span>{stock.ticker.todaysChange}</span>
                  <span>{stock.ticker.todaysChangePerc}%</span>
                </div>
              </NavLink>
            </ListItem>
            <Divider />
          </>
        )
      })}
        </List>
      </Card>
  )
};

export default Portfolio;
