import { useEffect } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { loadToken, selectToken, } from './store/userSlice'

import Login from './features/LoginForm'
import Dashboard from './features/Dashboard/Dashboard'
import Asset from './features/Asset/Asset'
import Signup from './features/Signup'

const PrivateRoute = (props) => {
  return (<Route render={() => {
    return (
      props.needLogin === true
        ? <Redirect to='/login' />
        : props.children
      );
    }}/>);
}


const Router = () => {
  const dispatch = useAppDispatch()
  const token = useAppSelector(selectToken)

  useEffect(() => {

    // check if token is still valid based on age
    const expiration = window.localStorage.getItem('expiration')
    if(expiration <= Math.floor(Date.now() /1000)) {
      window.localStorage.removeItem('expiration')
      window.localStorage.removeItem('token')
    }

    const localToken = window.localStorage.getItem('token');
    if(localToken) {
      dispatch(loadToken(localToken))
    }

  }, [dispatch]);
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
        <Route
        path='/sign-up'
        render={(props) => (
          <Signup {...props} />
        )}
        />
        <PrivateRoute
        path='/'
        exact={true}
        needLogin={needLogin}>
          <Dashboard token={token}/>
        </PrivateRoute>

        <Route
        path='/assets/:symbol'
        needLogin={needLogin}>
          <Asset token={token}/>
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default Router;
