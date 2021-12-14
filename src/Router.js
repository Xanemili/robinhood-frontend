import { useEffect } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { loadToken, selectToken, resetToken } from './store/userSlice'
import Box from '@mui/material/Box'
import Login from './features/LoginForm'
import Dashboard from './features/Dashboard/Dashboard'
import Asset from './features/Asset/Asset'
import Signup from './features/Signup'
import CssBaseline from '@mui/material/CssBaseline'
import NavBar from './features/Navbar'
import Toolbar from '@mui/material/Toolbar'
import EditProfile from './features/Profile/EditProfile'

const PrivateRoute = (props) => {
  const { component: Component, token, path } = props
  return (<Route path={path} render={(props) => {
    const localToken = localStorage.getItem('token')
    return (
      !token && !localToken
        ? <Redirect to='/login' />
        : <Component {...props}/>
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
      dispatch(resetToken())
    }

    const localToken = window.localStorage.getItem('token');
    if(localToken) {
      dispatch(loadToken(localToken))
    }
  });

  return (
    <BrowserRouter>
      <CssBaseline />
      <Box component="main" sx={{ flexGrow: 1, overflow: 'auto'}}>
        <NavBar />
        <Toolbar />
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
            token={token}
            component={Dashboard}
          />
          <PrivateRoute
            path='/assets/:symbol'
            token={token}
            component={Asset}
          />
          <PrivateRoute
          path='/profile/edit'
          component={EditProfile}
          />
          {/* <PrivateRoute
          path='/profile'
          component={Profile}
          /> */}
        </Switch>
      </Box>
      {
        //work on the footer
      //
      // <Box component={'footer'}>
      //   <Typography variant={'h5'}>
      //     Data Sourced from IEX Exchange
      //   </Typography>
      // </Box>
      }
    </BrowserRouter>
  );
}

export default Router;
