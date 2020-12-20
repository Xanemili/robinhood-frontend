import React, {useState, useEffect} from 'react'
import { ListItemText } from '@material-ui/core'


const StockPrice = ({data}) => {

  return (
    <>
    {data ?
      <ListItemText
      primary={data.c ? `$ ${(data.c).toFixed(2)}` : 0}
      secondary={data.c ? `${(((data.c / data.o) - 1) * 100).toFixed(2)}%` : 0}
      >
      </ListItemText> : <></>
    }
    </>
  )
}

export default StockPrice;
