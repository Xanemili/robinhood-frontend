import React, {useState, useEffect, useContext} from 'react';
import Grid from '@material-ui/core/Grid'
import { getAssetData } from '../../fetches/asset'
import NavBar from '../Navbar';
import TradePanel from './TradePanel'
import RobinhoodContext from '../../RobinhoodContext';
import StockReChart from '../charts/StockReChart';
import CompanyInfo from './CompanyInfo';
import CompanyNews from './CompanyNews'
import {useParams} from 'react-router-dom';
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import makeStyles from '@material-ui/styles/makeStyles'
import './asset-styles.css'

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

const Asset = () => {

  const {token, asset, setAsset} = useContext(RobinhoodContext)
  const [lastPrice, setLastPrice] = useState(0)
  const {symbol} = useParams();

   const classes = useStyles();

  useEffect(()=> {

    if(!asset.companyInfo){
      return;
    }

    (async() => {
      if(asset.companyInfo.symbol !== symbol){
        const dataRes = await getAssetData(token, symbol);
        console.log(dataRes)
        await setAsset(dataRes)
      }
    })();
  }, [asset, symbol, token, setAsset])

  if(!asset){
    return null
  }

  return(
    <div className={classes.root}>
      <CssBaseline />
      <NavBar/>
       <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {/* {!asset.companyInfo ? <div> Asset was not found </div> : asset.companyInfo.error ? <div> Asset was not found </div> : */}
      <Container maxWidth={'xl'} className={classes.container}>

      <Grid container spacing={5} justify={'center'}>
        <Grid item xs={6}>
          <StockReChart />
          <CompanyInfo />
          <CompanyNews />
        </Grid>

        <Grid item xs={2}>
          <TradePanel />
        </Grid>
      </Grid>
      </Container>
        {/* } */}
      </main>
    </div>
  )

}

export default Asset;
