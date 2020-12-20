import React, { useEffect, useContext, useState} from 'react';
import Grid from '@material-ui/core/Grid'
import { getAssetData } from '../../fetches/asset'
import NavBar from '../Navbar';
import TradePanel from './TradePanel'
import RobinhoodContext from '../../RobinhoodContext';
import AssetQuote from './AssetQuote'
import StockReChart from '../charts/StockReChart';
import CompanyInfo from './CompanyInfo';
import CompanyNews from './CompanyNews'
import {useParams} from 'react-router-dom';
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
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

  const {token} = useContext(RobinhoodContext)
  const [asset, setAsset] = useState({})
  const {symbol} = useParams();

   const classes = useStyles();

  useEffect(()=> {

    (async() => {
        const dataRes = await getAssetData(token, symbol);
        await setAsset(dataRes)
    })();
  }, [symbol, setAsset, token])

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
          <Paper className="chart" style={{ marginBottom: 10 }}>
            <AssetQuote asset={asset}/>
            <StockReChart asset={asset}/>
          </Paper>
          <CompanyInfo asset={asset}/>
          <CompanyNews asset={asset}/>
        </Grid>

        <Grid item xs={3}>
          <TradePanel asset={asset}/>
        </Grid>
      </Grid>
      </Container>
        {/* } */}
      </main>
    </div>
  )

}

export default Asset;
