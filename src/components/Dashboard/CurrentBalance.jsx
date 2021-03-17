import React, {useContext, useState, useEffect} from 'react';
import RobinhoodContext from '../../RobinhoodContext';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {addCash, getCash} from '../../fetches/portfolio';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';

const CurrentBalance = (props) => {

  const [cashToggle, setCashToggle] = useState(false);
  const dispatch = useDispatch()


  useEffect(()=> {
    if(cashToggle){
      (async()=>{
        await dispatch(addCash)
      })();
      setCashToggle(false);
    }
  }, [cashToggle, setCashToggle])

    return(
    <Paper style={{padding: 5, margin: 3}}>
      <Grid container justify='space-between' spacing={3} alignItems='center'>
        <Grid item style={{margin: 4}}>
          Balance: $
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
