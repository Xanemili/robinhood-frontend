import React, {useEffect, useContext,} from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import RobinhoodContext from '../RobinhoodContext';

import Login from './LoginForm'
import Dashboard from './Dashboard/Dashboard'
import Asset from './Asset/Asset'
// import Navbar from './Navbar'

const PrivateRoute = (props) => {
  return (
    <Route {...props} render={() => {
      if(props.needLogin === true){
        return <Redirect to='/login' />
      } else {
        return props.children;
      }
    }}
  />);
}

const App = () => {
  const { token, setToken } = useContext(RobinhoodContext)

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
        path='/assets/:symbol'
        needLogin={needLogin}>
          <Asset token={token}/>
        </PrivateRoute>


      </Switch>
    </BrowserRouter>
  );
}

export default App;
