import React, { useState} from 'react';
import { Redirect } from 'react-router-dom';
import { getToken } from '../../fetches/authentication';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'


import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {
  makeStyles
} from '@material-ui/core/styles';
import { useAuthDataContext } from './AuthDataContext';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://cdn.pixabay.com/photo/2015/10/31/11/59/financial-equalization-1015294_960_720.jpg)',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginForm = () => {
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password22');
  const {onLogin, token} = useAuthDataContext()

  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getToken(email, password);
    await window.localStorage.setItem('token', token);
    onLogin({token: token})
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if(token) {
    return <Redirect to='/' />;
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={updateEmail}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={updatePassword}
            />
        <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}>
            Sign In
        </Button>
        <Grid container justify='center'>
        <Grid item>
          <Link href="/sign-up" variant="body2" color='secondary'>
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
        </Grid>
        </form>
      </div>
      </Grid>
    </Grid>
  )
}

export default LoginForm
