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
import './asset-styles.css'

const Asset = () => {

  const {token, asset, setAsset} = useContext(RobinhoodContext)
  const [lastPrice, setLastPrice] = useState(0)
  const {symbol} = useParams(); // PARAMS ARENT WORING

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
    <>
      <nav>
        <NavBar />
      </nav>
      <main>

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
      </main>
    </>
  )

}

export default Asset;
