import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText';

import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { getPortfolio } from '../fetches/portfolio';

const Portfolio = ({currentUser}) => {


  const portfolio = currentUser.portfolio;

  if(!portfolio) {
    return null;
  }

  return (
      <Card>

        <List>
      {portfolio.map( (stock, idx)=> {
        return(
          <>
            <ListItem alignItems='center' key={stock.Ticker.ticker}>
              <NavLink  to={`/assets/${stock.Ticker.ticker}`}>
                <div>
                  <span>
                  {stock.Ticker.ticker}
                  </span>
                  <span>{stock.amount}</span>
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
