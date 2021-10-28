import { baseUrl } from '../config';

export const getToken = async (email, password) => {
  const response = await fetch(`${baseUrl}/session`, {
    method: 'put',
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({ email, password }),
  });

  if(response.ok) {
    const { token, expiration } = await response.json();
    window.localStorage.setItem('token', token)
    window.localStorage.setItem('expiration', expiration)
    return token;
  }

  if(response.status === 403) {
    window.localStorage.removeItem('token')
  }
}

export const createUser = async (body) => {

  const response = await fetch(`${baseUrl}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  })


  if(response.ok) {
    const {token, expiration} = await response.json();
    window.localStorage.setItem('token', token)
    window.localStorage.setItem('expiration', expiration)
    return token;
  } else {
    return;
  }
}
