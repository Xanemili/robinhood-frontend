// used https://medium.com/trabe/implementing-private-routes-with-react-router-and-hooks-ed38d0cf93d5 as a reference for creating react context for auth
import React, { useContext, useEffect, useMemo, useState, createContext } from 'react'

export const AuthDataContext = createContext(null);

const initialAuthData = {}

const AuthDataProvider = props => {
  const [authData, setAuthData] = useState(initialAuthData)

  useEffect(() => {
    (() =>{
      const token = window.localStorage.getItem('token')
    const user = 'user' //ADD ASYNC USER FETCH HERE
    const currentAuthData = {
      token,
      user
    }
    if (currentAuthData) {
      setAuthData(currentAuthData)
    }
    })()
  }, [])

  const onLogout = () => setAuthData(initialAuthData)

  const onLogin = newAuthData => setAuthData(newAuthData)

  const authDataValue = useMemo(() => ({ ...authData, onLogin, onLogout }), [authData]);

  return <AuthDataContext.Provider value={authDataValue} {...props} />
}

export const useAuthDataContext = () => useContext(AuthDataContext)

export default AuthDataProvider