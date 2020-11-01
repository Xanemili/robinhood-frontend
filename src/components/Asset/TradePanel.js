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
import { Divider, TextField } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import red from '@material-ui/core/colors/red'

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


export default function TradePanel () {

  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);
  const [orderType, setOrderType] = useState('BUY');
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
    } else {
      console.log('trade failed')
    }

  }

  const updateProperty = callback => e => {
    callback(e.target.value)
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

    <form onSubmit={handleOrder} padding={2}>
      <Grid container justify='space-between' direction='column' alignItems='center' spacing={2}>
        <Grid item xs={8} style={{padding: 14}}>
          <Typography variant='h3'>
          {asset.companyInfo.symbol}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Button onClick={() => setOrderType('BUY')} color='secondary'>
            Buy
          </Button>
          <Button onClick={() => setOrderType('SELL')} color={red[50]}>
            Sell
          </Button>
        </Grid>
        <Grid item xs={8}>
          <TextField
          label="# Shares"
          name="numberformat"
          id="formatted-numberformat-input"
          InputProps={{
          inputComponent: NumberFormatCustom,}}
          required
          variant="outlined"
          value={amount}
          onChange={updateProperty(setAmount)}/>
        </Grid>
        <Grid item xs={8}>
          <TextField
          label="Price"
          required
          variant='outlined'
          value={`${price}`}
          onChange={updateProperty(setPrice)}
        />
        </Grid>
        <Grid item xs={8} >
        <Button type='submit' size='large' style={{padding: 12}}>
          Confirm Trade
        </Button>
        </Grid>
      </Grid>
    </form>
    <Divider variant='middle'/>
      <Grid container justify='center' style={{padding: 12}}>
        <Button onClick={addToList} >
          Add To List
        </Button>
      </Grid>

    </Card>

  )
}
