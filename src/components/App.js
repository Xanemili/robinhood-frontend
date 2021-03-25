import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Auth/LoginForm'
import Dashboard from './Dashboard/Dashboard'
import Asset from './Asset/Asset'
import Signup from './Auth/Signup'
import InfoBar from './InfoBar/InfoBar'
import AuthDataProvider, { useAuthDataContext } from './Auth/AuthDataContext'
import { makeStyles } from '@material-ui/core/styles'
// import Profile from './Profile'

const PrivateRoute = ({ component, ...options }) => {
  const { token } = useAuthDataContext()
  let finalComponent = token ? component : Login
  return (<Route {...options} component={finalComponent} />);
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
}))

const App = () => {
  const classes = useStyles()
  //need to lift the overall grid components here. Have the Switch be for loading the dynamic content
  return (
    <BrowserRouter>
      <AuthDataProvider>
        <div className={classes.root}>
          <InfoBar />
          <Switch>
          <main className={classes.content}>
          <div className={classes.appBarSpacer} />
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
          </main>
          </Switch>
        </div>
      </AuthDataProvider>
    </BrowserRouter>
  );
}

export default App;
