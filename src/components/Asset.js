import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid'
import { getAssetData } from '../fetches/asset'
import NavBar from './Navbar';
import News from './News'
import TradePanel from './TradePanel'

const Asset = ({token}) => {
  const { asset } = useParams();
  const [ticker, setTicker] = useState(asset)
  const [data, setData] = useState({})

  useEffect(()=> {
    (async() => {
      const dataRes = await getAssetData(token, 'MSFT');
      setData(dataRes)
    })();
    console.log(data)
  }, [ticker, setTicker])

  return(
    <>
    <NavBar />
    <Grid container spacing={3}>
        <Grid item xs={6}>
          <News />
        </Grid>

        <Grid item xs={3}>
          <TradePanel />
        </Grid>
    </Grid>
    </>
  )

}

export default Asset;
