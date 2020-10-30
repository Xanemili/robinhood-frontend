import React, {useState} from 'react'
import RobinhoodContext from '../RobinhoodContext'
import App from './App';
import theme from '../muitheme'
import {ThemeProvider} from '@material-ui/core'


const Root = () => {

  const [token, setToken] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [portfolio, setPortfolio] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [asset, setAsset] = useState({});

  const value =  {
    token,
    setToken,
    currentUser,
    setCurrentUser,
    portfolio,
    setPortfolio,
    watchlist,
    setWatchlist,
    asset,
    setAsset
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
