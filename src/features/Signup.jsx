import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import Container from '@mui/material/Container';
import {createUser} from '../fetches/authentication'
import { Redirect } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { selectToken, loadToken } from '../store/userSlice';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const token = useAppSelector(selectToken)
  const dispatch = useAppDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();

    let body = {
      email,
      password,
      username,
      lastName,
      firstName,
      address: 'test',
      phone: '1111111111'
    }

    const token = await createUser(body);
    if(token){
      dispatch(loadToken(token))

    } else {
      alert('user creation failed')
    }
  }

  if (token) {
    return <Redirect to='/' />;
  }

  const updateValue = (callback) => (e) => {
    callback(e.target.value)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label='First Name'
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                value={firstName}
                onChange={updateValue(setFirstName)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={lastName}
                onChange={updateValue(setLastName)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={updateValue(setEmail)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="username"
                label="Username"
                type="username"
                id="username"
                value={username}
                onChange={updateValue(setUsername)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={updateValue(setPassword)}
              />
              </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/login" variant="body2" color='secondary'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
