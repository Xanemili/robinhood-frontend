import React, { useState, useContext, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import RobinhoodContext from '../../RobinhoodContext';
import { sendTrade } from '../../fetches/asset';
import { Divider, TextField } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { addItemToList, deleteListItem } from '../../fetches/portfolio';
import ActionModal from './ActionModal';

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix=""
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};



export default function TradePanel({ asset: { quote } }) {

  const [amount, setAmount] = useState(10);
  const [price, setPrice] = useState();
  const [orderType, setOrderType] = useState('BUY');
  const { token } = useContext(RobinhoodContext);

  useEffect(() => {
    if (quote) {
      setPrice(quote.latestPrice)
    }
  }, [quote])

  const handleOrder = async (e) => {
    e.preventDefault();
    const payload = {
      orderType,
      ticker: quote.symbol,
      price: quote.latestPrice,
      amount
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
    let response = await addItemToList(token, quote.symbol);
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
        <Grid container justify='space-between' direction='column' alignItems='center' spacing={2}>
          <Grid item xs={8} style={{ padding: 14 }}>
            <Typography variant='h3'>
              {quote.symbol}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Button onClick={() => setOrderType('BUY')} color='secondary'>
              Buy
          </Button>
            <Button onClick={() => setOrderType('SELL')}>
              Sell
          </Button>
          </Grid>
          <Grid item xs={8}>
            <TextField
              label="# Shares"
              name="numberformat"
              id="formatted-numberformat-input"
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
              required
              variant="outlined"
              value={amount}
              onChange={updateProperty(setAmount)} />
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
              value={`${new Intl.NumberFormat('en-us', { style: 'currency', currency: 'USD' }).format(amount * price)}`}
            />
          </Grid>
          <Grid item xs={8} >
            <Button type='submit' size='large' style={{ padding: 12 }}>
              Confirm Trade
        </Button>
          </Grid>
        </Grid>
      </form>
      <Divider variant='middle' />
      <Grid container justify='center' style={{ padding: 12 }}>
        <Button onClick={addToList} >
          Add To List
        </Button>
        <Button onClick={removeFromList}>
          Remove From List
        </Button>
      </Grid>

    </Card>

  )
}
