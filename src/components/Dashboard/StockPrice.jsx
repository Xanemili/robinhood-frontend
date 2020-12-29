import React, { useEffect, useState } from 'react'
import { ListItemText } from '@material-ui/core'


const StockPrice = ({price}) => {

  // temporary stop gap to show stock price data. will be swapped to a socket for entire portfolio.

  return (
    <>
    {console.log(price)}
    {price ?
      <ListItemText
      primary={price.lastSalePrice ? `$ ${(price.lastSalePrice).toFixed(2)}` : 0}
      // will take extra data calls at this point to show %, will add.
      // secondary={price ? `${(((price / price) - 1) * 100).toFixed(2)}%` : 0}
      >
      </ListItemText> : <></>
    }
    </>
  )
}

export default StockPrice;
