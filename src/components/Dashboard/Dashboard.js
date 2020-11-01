import React, {useContext} from 'react';
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';


import Portfolio from './Portfolio'
import NavBar from '../Navbar'
import PortfolioChart from './PortfolioChart'
import RobinhoodContext from '../../RobinhoodContext'
import NewsContainer from './NewsContainer';
import CurrentBalance from './CurrentBalance'

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

      <Grid container spacing={3} justify='center'>
        <Grid item xs={6}>
          <PortfolioChart />
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
