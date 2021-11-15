import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { sendTrade } from '../../fetches/asset';
import { Divider, TextField } from '@mui/material';
import { addListItem, deleteListItem } from '../../fetches/list';
import ActionModal from './ActionModal';
import { useAppSelector } from '../../store/hooks';
import { selectToken } from '../../store/userSlice';

export default function TradePanel({ asset: { quote } }) {

  const [quantity, setQuantity] = useState(10);
  const [price, setPrice] = useState();
  const [orderType, setOrderType] = useState('BUY');
  const token = useAppSelector(selectToken)

  useEffect(() => {
    if (quote) {
      setPrice(quote.latestPrice)
    }
  }, [quote])

  const handleOrder = async (e) => {
    e.preventDefault();
    const payload = {
      orderType,
      symbol: quote.symbol,
      price: quote.latestPrice,
      quantity
    }


    const success = await sendTrade(token, payload);
    if (success) {
      alert('Trade Successful!')
    } else {
      alert('Trade Failed')
    }
  }

  const updateProperty = callback => e => {
    callback(e.target.value)
  }

  const addToList = async () => {
    let response = await addListItem(token, quote.symbol);
    if (response) {
      alert(`${quote.symbol} was added to your Watchlist.`)
    }
  }

  const removeFromList = async () => {
    let response = await deleteListItem(token, quote.symbol);
    return <ActionModal message={response.message} />
  }

  if (!quote) {
    return null;
  }


  return (
    <Card>
      <form onSubmit={handleOrder} padding={2}>
        <Grid container justifyContent='space-between' direction='column' alignItems='center' spacing={2}>
          <Grid item xs={8}>
            <Typography variant='h3'>
              {quote.symbol}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Button onClick={() => setOrderType('BUY')} color='secondary' variant={orderType === 'BUY' ? 'outlined' : null}>
              Buy
          </Button>
            <Button onClick={() => setOrderType('SELL')} color='inherit' variant={orderType === 'SELL' ? 'outlined' : null}>
              Sell
          </Button>
          </Grid>
          <Grid item xs={8}>
            <TextField
              label="# Shares"
              name="numberformat"
              id="formatted-numberformat-input"
              required
              variant="outlined"
              value={quantity}
              onChange={updateProperty(setQuantity)} />
          </Grid>
          <Grid item xs={8}>
            <TextField
              label="Price"
              required
              variant='outlined'
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
      <Divider variant='middle' />

      {
        // needs to be reworked, multiple lists now available.
      // <Grid container justifyContent='center' style={{ padding: 12 }}>
      //   <Button onClick={addToList} >
      //     Add To List
      //   </Button>
      //   <Button onClick={removeFromList}>
      //     Remove From List
      //   </Button>
      // </Grid>
      }

    </Card>
  );
}
