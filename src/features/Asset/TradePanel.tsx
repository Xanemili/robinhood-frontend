import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { sendTrade } from '../../fetches/asset';
import { ButtonGroup, CardContent, Divider, TextField } from '@mui/material';
import { useAppSelector } from '../../store/hooks'
import { selectToken } from '../../store/userSlice'

import { IexAsset } from '../../api-types'
import WatchListDropDown from '../Lists/WatchListDropDown';

interface TradePanelProps {
  quote: IexAsset
}

export default function TradePanel(props: TradePanelProps) {

  const { quote } = props

  const [quantity, setQuantity] = useState(10)
  const [price, setPrice] = useState(0.00)
  const [orderType, setOrderType] = useState('buy')
  const token = useAppSelector(selectToken)


  const handleOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      orderType,
      symbol: quote.symbol,
      price: quote.latestPrice,
      quantity
    }

    await sendTrade(token, payload);
  }

  if (!quote) {
    return null;
  }

  return (
    <Card sx={{}}>
      <CardContent>
        <form onSubmit={handleOrder}>
          <Grid container justifyContent='space-between' direction='column' alignItems='center' spacing={2}>
            <Grid item xs={8}>
              <Typography variant='h3'>
                {quote.symbol}
              </Typography>
            </Grid>
            <Grid item xs={8}>
            <ButtonGroup>
              <Button onClick={() => setOrderType('buy')} color='secondary' variant={orderType === 'buy' ? 'contained' : 'outlined'}>
                  Buy
              </Button>
              <Button onClick={() => setOrderType('sell')} color='secondary' variant={orderType === 'sell' ? 'contained' : 'outlined'}>
                  Sell
              </Button>
            </ButtonGroup>
            </Grid>
            <Grid item xs={8}>
              <TextField
                label="# Shares"
                name="numberformat"
                id="formatted-numberformat-input"
                required
                variant="outlined"
                type='number'
                value={quantity}
                onChange={(e) => setQuantity(parseFloat(e.target.value))} />
            </Grid>
            <Grid item xs={8}>
              <TextField
                label="Price"
                required
                variant='outlined'
                type='number'
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                value={`${price}`}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                label="Trade Total"
                disabled
                variant='standard'
                value={`${new Intl.NumberFormat('en-us', { style: 'currency', currency: 'USD' }).format(quantity * price)}`}
              />
            </Grid>
            <Grid item xs={8} >
              <Button color='secondary' type='submit' size='large'>
                Confirm Trade
          </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
      <Divider variant='middle' />
      <WatchListDropDown symbol={quote.symbol}/>
    </Card>
  );
}
