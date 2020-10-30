import React, {useContext} from 'react';
import RobinhoodContext from '../../RobinhoodContext';
import StockReChart from './StockReChart';

const StockChart = () => {

  const {asset, setAsset} = useContext(RobinhoodContext);

  return (
    <StockReChart />
  )
}

export default StockChart;
