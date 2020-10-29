import React, {useEffect, useContext, useState} from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import RobinhoodContext from '../RobinhoodContext';

import Login from './LoginForm'
import Dashboard from './Dashboard'
import Asset from './Asset'
// import Navbar from './Navbar'

const PrivateRoute = (props) => {
  return (
    <Route render={() => {
      if(props.needLogin === true){
        return <Redirect to='/login' />
      } else {
        return props.children;
      }
    }}
  />);
}

const App = () => {
  const [ token, setToken ] = useState('')

  useEffect(() => {
    (async() => {
      const localToken = window.localStorage.getItem('token');
      if(localToken) {
        setToken(localToken)
      }
    })()
  }, [setToken]);

  const needLogin = !token;

  return (
    <BrowserRouter>
      <Switch>
        <Route
        path='/login'
        render={(props) => (
          <Login {...props} />
        )}
        />
        <PrivateRoute
        path='/'
        exact={true}
        needLogin={needLogin}>
          <Dashboard token={token}/>

        </PrivateRoute>

        <PrivateRoute
        path='/assets/:asset'>
          <Asset token={token}/>
        </PrivateRoute>


      </Switch>
    </BrowserRouter>
  );
}

export default App;
