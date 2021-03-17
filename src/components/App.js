import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Login from './Auth/LoginForm'
import Dashboard from './Dashboard/Dashboard'
import Asset from './Asset/Asset'
import Signup from './Auth/Signup'
import AuthDataProvider, { useAuthDataContext } from './Auth/AuthDataContext'
// import Profile from './Profile'

const PrivateRoute = ({component, ...options}) => {
  const {token} = useAuthDataContext()
  let finalComponent = token ? component : Login
  return (<Route {...options} component={finalComponent}/>);
}


const App = () => {

  return (
    <BrowserRouter>
      <AuthDataProvider>
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
            component={Dashboard}>
          </PrivateRoute>

          <PrivateRoute
            path='/profile'
            exact={true}>
            {/* <Profile token={token}/> */}
          </PrivateRoute>

          <PrivateRoute
            path='/assets/:symbol'
            component={Asset}>
          </PrivateRoute>
        </Switch>
      </AuthDataProvider>
    </BrowserRouter>
  );
}

export default App;
