import { ListItemText } from '@mui/material'
import { useEffect } from 'react'


const StockPrice = ({price}) => {



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
