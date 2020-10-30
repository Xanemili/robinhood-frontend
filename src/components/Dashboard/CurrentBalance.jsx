import React, {useContext} from 'react';
import RobinhoodContext from '../../RobinhoodContext';

const CurrentBalance = () => {

  const {portfolio} = useContext(RobinhoodContext);

  if(!portfolio) {
    return null;
  }

  const cash = portfolio.filter(sec => sec.ticker.ticker === 'CASH');


  if(cash.length === 0){
    return null;
  }

  return(
    <div>
      BALANCE: $
      {cash[0].ticker.ticker}
    </div>
  )
}

export default CurrentBalance;
