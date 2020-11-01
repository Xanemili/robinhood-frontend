import React, {useState} from 'react'
import RobinhoodContext from '../RobinhoodContext'
import App from './App';
import theme from '../muitheme'
import {ThemeProvider} from '@material-ui/core'


const Root = () => {

  const [token, setToken] = useState('');
  const [assetPrice, setAssetPrice] = useState(0.00);
  const [portfolio, setPortfolio] = useState([{Ticker: {ticker: ''}}]);
  const [watchlist, setWatchlist] = useState([]);
  const [asset, setAsset] = useState({data: {results: []}, companyInfo: {similar: []}, companyNews: []});

  const value =  {
    token,
    setToken,
    assetPrice,
    setAssetPrice,
    portfolio,
    setPortfolio,
    watchlist,
    setWatchlist,
    asset,
    setAsset,
  }
  return (
    <RobinhoodContext.Provider value={value}>
       <ThemeProvider theme={theme}>
          <App />
      </ThemeProvider>
    </RobinhoodContext.Provider>
  )
}

export default Root;
