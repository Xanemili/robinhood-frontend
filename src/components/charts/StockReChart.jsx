import React, {useState} from 'react';
import {LineChart, Line, YAxis, Tooltip} from 'recharts';

const RANGES = {
  '1W': { length: 5, increment: 1},
  '1M': { length: 23, increment: 1},
  '3M': { length: 66, increment: 1},
  '1Y': { length: 252, increment: 1},
  // '5Y': { length: 1265, increment: 5}
}

const MONTHS = {
  1: "JAN",
  2: "FEB",
  3: "MAR",
  4: "APR",
  5: "MAY",
  6: "JUN",
  7: "JUL",
  8: "AUG",
  9: "SEP",
  10: "OCT",
  11: "NOV",
  12: "DEC"
};

const StockRechart = () => {

  const [active, setActive] = useState('')

  const render1DChart = () => {

  }
  const data = []

  const handleRange = (e) => {
    console.log(e)
  }

  const handleIntraDay = (e) => {
    console.log(e)
  }

  return (
    <div className="chart">
      <h1>symbol</h1>
      <h2>stock price</h2>
      <h3>price % change</h3>
      <div className="stock-chart">
        <LineChart width={650} height={200} data={data}
        margin={{top: 5, right: 30, left: 0, bottom: 5}}>
          <YAxis hide={true}
          domain={[1,5]} />
          <Tooltip />
          <Line type='linear' dataKey='price' dot={false} />
        </LineChart>
        <ul className='chart-range__stock'>
          <li><a className={active === '1D' ? 'chart-date-range active' : 'chart-date-range'} onClick={handleIntraDay}>1D</a></li>
          <li><a className={active === '1M' ? 'chart-date-range active' : 'chart-date-range'} onClick={handleRange}>1M</a></li>
          <li><a className={active === '3M' ? 'chart-date-range active' : 'chart-date-range'} onClick={handleRange}>3M</a></li>
          <li><a className={active === '1Y' ? 'chart-date-range active' : 'chart-date-range'} onClick={handleRange}>1Y</a></li>
          <li><a className={active === '5Y' ? 'chart-date-range active' : 'chart-date-range'} onClick={handleRange}>5Y</a></li>
        </ul>
      </div>
    </div>
  )
}

export default StockRechart
