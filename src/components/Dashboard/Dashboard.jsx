import React, {useContext} from 'react';
import Grid from '@material-ui/core/Grid'
import CssBaseline from '@material-ui/core/CssBaseline'
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
    display: 'flex'
  },
  appBarSpacer: {...theme.mixins.toolbar},
  content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    },
}));

const DashBoard = () => {

   const {token} = useContext(RobinhoodContext);

   const classes = useStyles();

   if(!token) {
     return null
   }
    return(
      <div className={classes.root}>
      <CssBaseline />
      <NavBar/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
          <Container maxWidth={'xl'} className={classes.container}>
          <Grid container spacing={5} justify='center'>
            <Grid item xs={6}>
              <Grid container direction='column' spacing={2}>
                <Grid item>
                  <PortfolioChart />
                </Grid>
                < Grid item>
                  <CurrentBalance />
                </Grid>
                < Grid item>
                  <NewsContainer />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={2}>
              <Portfolio />
            </Grid>

          </Grid>
          </Container>
      </main>

    </div>
    )
}


export default DashBoard;
