import { useState, } from 'react';
import { Redirect } from 'react-router-dom';
import { getToken } from '../fetches/authentication';
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { selectToken, loadToken } from '../store/userSlice';

const LoginForm = () => {
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password22');

  const token = useAppSelector(selectToken)
  const dispatch = useAppDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getToken(email, password);
    dispatch(loadToken(token))
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
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main'}}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary">
            Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="/sign-up" variant="body2" color='secondary'>
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginForm
