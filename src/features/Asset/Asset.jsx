import React, { useEffect, useState} from 'react';
import Grid from '@mui/material/Grid'
import { getAssetData } from '../../fetches/asset'
import NavBar from '../Navbar';
import TradePanel from './TradePanel'
import AssetQuote from './AssetQuote'
import StockReChart from '../charts/StockReChart';
import CompanyInfo from './CompanyInfo';
import CompanyNews from './CompanyNews'
import {useParams} from 'react-router-dom';
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import makeStyles from '@mui/styles/makeStyles'
import { useAppSelector } from '../../store/hooks';
import { selectToken } from '../../store/userSlice';

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

  const token = useAppSelector(selectToken)
  const [asset, setAsset] = useState({})
  const {symbol} = useParams();

   const classes = useStyles();

  useEffect(()=> {

    (async() => {
        const dataRes = await getAssetData(token, symbol);
        setAsset(dataRes)
    })();
  }, [symbol, setAsset, token])

  if(!asset){
    return null
  }

  return (
    <div className={classes.root}>
      <NavBar/>
       <main className={classes.content}>
        <div className={classes.appBarSpacer} />
      <Container maxWidth={'xl'} className={classes.container}>

      <Grid container spacing={5} justifyContent={'center'}>
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
      </main>
    </div>
  );

}

export default Asset;
