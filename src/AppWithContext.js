import RobinhoodContext from './RobinhoodContext';
import React, {useState} from 'react';
import App from './App';

const AppWithContext = () => {

  const [token, setToken] = useState('');

  const value = {
    token,
    setToken
  }

  return(
    <RobinhoodContext.Provider value={value}>
      <App />
    </RobinhoodContext.Provider>
  )
};

export default AppWithContext;
