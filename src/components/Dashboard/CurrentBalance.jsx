import React, {useContext, useState, useEffect} from 'react';
import RobinhoodContext from '../../RobinhoodContext';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {addCash, getCash} from '../../fetches/portfolio';
import Button from '@material-ui/core/Button';

const CurrentBalance = (props) => {

  const [cashToggle, setCashToggle] = useState(false);
  const [cash, setCash] = useState({})
  const {token} = useContext(RobinhoodContext);

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

    return(
    <Paper style={{padding: 5, margin: 3}}>
      <Grid container justify='space-between' spacing={3} alignItems='center'>
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
  )
}

export default CurrentBalance;
