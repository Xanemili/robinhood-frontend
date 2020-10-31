import React, {useContext} from 'react';
import RobinhoodContext from '../../RobinhoodContext';

const CurrentBalance = () => {

  const {portfolio} = useContext(RobinhoodContext);

  if(portfolio.length === 0) {
    return null;
  }

  console.log(portfolio)

  return(
    <div>
      BALANCE: $

    </div>
  )
}

export default CurrentBalance;
