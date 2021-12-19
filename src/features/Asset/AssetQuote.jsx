import React from 'react'
import Typography from '@mui/material/Typography'

const AssetQuote = ({asset: {quote}}, symbol, color) => {

  if(!quote){
    return null;
  }

  return (
    <div style={{ marginLeft: 14 }}>
      <Typography variant={'h5'}>{quote.symbol}</Typography>
      <Typography variant='h5'>{quote.latestPrice}</Typography>
      <Typography style={{ color: color }}>{quote.change}</Typography>
      <Typography style={{ color: color, fontWeight: 'bold' }}>{quote.changePercent*100}%</Typography>
    </div>
  )
}

export default AssetQuote;
