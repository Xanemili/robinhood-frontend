import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import configureStore from './store.js';
import App from './components/App';
import theme from './muitheme'
import {ThemeProvider} from '@material-ui/core'
import RobinhoodContext from './RobinhoodContext';
import value from './values';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
       <ThemeProvider theme={theme}>
         <RobinhoodContext.Provider value={value}>
          <App />
         </RobinhoodContext.Provider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
