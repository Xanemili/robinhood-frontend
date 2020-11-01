import React, {useContext} from 'react';
import RobinhoodContext from '../../RobinhoodContext';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { useState } from 'react';

const CurrentBalance = (props) => {

  return(
    <Paper>
      <Grid container justify='space-between'>
        <Grid item>
          BALANCE: ${props.cash}
        </Grid>


      </Grid>
    </Paper>
  )
}

export default CurrentBalance;
