import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { getToken } from './fetches/authentication';
import {Button} from '@material-ui/core'
import RobinhoodContext from './RobinhoodContext'

const LoginForm = () => {
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password22');

  const { token, setToken } = useContext(RobinhoodContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getToken(email, password);
    setToken(token);
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
    <main>
      <form onSubmit={handleSubmit}>
        <input
        type='text'
        placeholder='Email'
        value={email}
        onChange={updateEmail}
        />
        <input
        type='password'
        placeholder="Password"
        value={password}
        onChange={updatePassword}
        />
        <Button variant='contained' color='primary' type='submit'>Login</Button>
      </form>
    </main>
  )
}

export default LoginForm
