import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import theme from './muitheme'
import {ThemeProvider} from '@material-ui/core'
import store from './redux/store'
import App from './components/App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
          <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
