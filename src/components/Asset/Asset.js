import React, {useState, useEffect, useContext} from 'react';
import Grid from '@material-ui/core/Grid'
import { getAssetData } from '../../fetches/asset'
import NavBar from '../Navbar';
import TradePanel from './TradePanel'
import RobinhoodContext from '../../RobinhoodContext';
import StockChart from '../charts/StockChart';

const Asset = () => {

  const {token, asset, setAsset} = useContext(RobinhoodContext)
  const [ticker, setTicker] = useState('')

  useEffect(()=> {
    (async() => {
      if(asset !== ticker){
        const dataRes = await getAssetData(token, 'MSFT');

        await setAsset(dataRes)
        await setTicker('MSFT')
      }
    })();


  }, [setAsset])

  return(
    <>
    <NavBar />
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <StockChart>

        </StockChart>
      </Grid>
      <Grid item xs={2}>

      </Grid>

      <Grid item xs={3}>
        <TradePanel />
      </Grid>
    </Grid>
    </>
  )

}

export default Asset;
