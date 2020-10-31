import React, {useContext, useEffect} from 'react';
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'

import Portfolio from './Portfolio'
import NavBar from '../Navbar'
import PortfolioChart from './PortfolioChart'
import RobinhoodContext from '../../RobinhoodContext'
import NewsContainer from './NewsContainer';
import CurrentBalance from './CurrentBalance'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const DashBoard = () => {

   const {token} = useContext(RobinhoodContext);


   if(!token) {
     return null
   }
    return(
      <>
      <nav>
        <NavBar />
      </nav>

      <Grid container spacing={3}>
      <PortfolioChart />
        <Grid item xs={6}>
          <CurrentBalance />
          <NewsContainer />
        </Grid>

        <Grid item xs={3}>
          <Portfolio />
        </Grid>

      </Grid>

    </>
    )
}


export default DashBoard;
