import React from 'react'
import { ListItemText } from '@material-ui/core'


const StockPrice = ({price}) => {

  // temporary stop gap to show stock price data. will be swapped to a socket for entire portfolio.

  return (
    <div>
      
    {price ?
      <ListItemText
      primary={price.lastSalePrice ? `$ ${(price.lastSalePrice).toFixed(2)}` : 0}
      // will take extra data calls at this point to show %, will add.
      // secondary={price ? `${(((price / price) - 1) * 100).toFixed(2)}%` : 0}
      >
      </ListItemText> : <></>
    }
    </div>
  )
}

export default StockPrice;
