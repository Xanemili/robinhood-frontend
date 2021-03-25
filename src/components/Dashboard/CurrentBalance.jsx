import React, {useState, useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {addCash} from '../../fetches/portfolio';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';

const CurrentBalance = (props) => {

  const [cashToggle, setCashToggle] = useState(false);
  const dispatch = useDispatch()
  const portfolio = useSelector(state => state.portfolio)

  useEffect(()=> {
    if(cashToggle){
      (async()=>{
        await dispatch(addCash)
      })();
      setCashToggle(false);
    }
  }, [cashToggle, setCashToggle, dispatch])

    return(
    <Paper style={{padding: 5, margin: 3}}>
      <Grid container justify='space-between' spacing={3} alignItems='center'>
        <Grid item style={{margin: 4}}>
          Balance: $ {portfolio['CASH'] ? portfolio['CASH'].total : 0 }
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
