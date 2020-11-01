import React, {useState, useEffect, useContext} from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import RobinhoodContext from '../../RobinhoodContext';
import { sendTrade } from '../../fetches/asset';
import { useParams } from 'react-router-dom';
import { Divider } from '@material-ui/core';




export default function TradePanel () {

  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);
  const [orderType, setOrderType] = useState('SELL');
  const {symbol} = useParams();

  const {token, asset} = useContext(RobinhoodContext);

  const handleOrder = async (e) => {
    e.preventDefault();
    const payload = {
      orderType,
      ticker: symbol,
      price,
      amount
    }

    const success = await sendTrade(token, payload);
    if(success) {
      console.log('yayayayay')
    }

  }

  const updateProperty = callback => e => {
    callback(e.target.value)
    console.log(e.target)
  }

  useEffect(() => {

  },[asset])

  const addToList = e => {
    console.log('here')
  }

  if(!asset.companyInfo) {
    return null;
  }


  return (
    <Card>

    <form onSubmit={handleOrder}>
      <Grid container justify='space-between' direction='column' alignItems='center'>
        <Grid item>
          <Typography variant='h3'>

          {asset.companyInfo.symbol}
          </Typography>
        </Grid>
        <Grid item>
          <Button onClick={() => setOrderType('BUY')} color='secondary'>
            Buy
          </Button>
          <Button onClick={() => setOrderType('SELL')} color='secondary'>
            Sell
          </Button>
        </Grid>
        <Grid item>
          <label >
            Amount
          </label>
          <input
          type='number'
          required
          value={amount}
          onChange={updateProperty(setAmount)}/>
        </Grid>
        <div>
          <label> Market Price</label>
          <input
          type='number'
          required
          value={price}
          onChange={updateProperty(setPrice)}/>
        </div>
        <Button type='submit'>
          Confirm Trade
        </Button>
      </Grid>
    </form>
    <Divider />
      <Grid container justify='center'>
        <Button onClick={addToList} >
          Add To List
        </Button>
      </Grid>

    </Card>

  )
}
