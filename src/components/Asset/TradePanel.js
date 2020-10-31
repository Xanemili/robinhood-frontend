import React, {useState, useEffect, useContext} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button'
import RobinhoodContext from '../../RobinhoodContext';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField'
import { sendTrade } from '../../fetches/asset';
import { useParams } from 'react-router-dom';




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

  if(!asset.data) {
    return null;
  }


  return (
    <Card>

    <form onSubmit={handleOrder}>
      <CardHeader>
      </CardHeader>
      <CardContent>
        {asset.ticker}
        <div>
          <Button onClick={() => setOrderType('BUY')}>
            Buy
          </Button>
          <Button onClick={() => setOrderType('SELL')}>
            Sell
          </Button>
        </div>
        <div>
          <label >
            Amount
          </label>
          <input
          type='number'
          required
          value={amount}
          onChange={updateProperty(setAmount)}/>
        </div>
        <div>
          <label>Price</label>
          <input
          type='number'
          required
          value={price}
          onChange={updateProperty(setPrice)}/>
        </div>
        <Button type='submit'>
          Confirm Trade
        </Button>

      </CardContent>
    </form>
        <Button onClick={addToList}>
          Add To List
        </Button>

    </Card>

  )
}
