import React, {useContext, useState, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {addCash, getCash} from '../../fetches/portfolio';
import Button from '@mui/material/Button';
import { useAppSelector } from '../../store/hooks';
import { selectToken } from '../../store/userSlice';

const CurrentBalance = (props) => {

  const [cashToggle, setCashToggle] = useState(false);
  const [cash, setCash] = useState('')
  const token = useAppSelector(selectToken)

  useEffect(()=> {
    if(cashToggle){
      (async()=>{
        const cashAdded = await addCash(token)
        if(cashAdded){
          setCash(cashAdded)
        }
      })();
      setCashToggle(false);

    }
  }, [cashToggle, setCashToggle, cash, token])

  useEffect(() => {
    if (cashToggle || !cash) {
      (async () => {
        const newcash = await getCash(token)
        setCash(newcash)
      })();
      setCashToggle(false);
    }
  })

    return (
      <Paper style={{padding: 5, margin: 3}}>
        <Grid container justifyContent='space-between' spacing={3} alignItems='center'>
          <Grid item style={{margin: 4}}>
            Balance: ${cash.tradeTotal}
          </Grid>
          <Grid item>
            <Button onClick={()=> setCashToggle(true)} color='secondary'>
              Add Cash: Free for a Limited Time
            </Button>

          </Grid>
        </Grid>
      </Paper>
    );
}

export default CurrentBalance;
