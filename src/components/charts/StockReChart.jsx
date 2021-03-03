import React, { useState, useContext, useEffect } from 'react';
import {useParams} from 'react-router-dom'
import { LineChart, Line, YAxis, Tooltip, XAxis, ResponsiveContainer } from 'recharts';
import RobinhoodContext from '../../RobinhoodContext';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import moment from 'moment'
import { getTimeSeriesData } from '../../fetches/asset'



const StockRechart = () => {

  const { token, } = useContext(RobinhoodContext)
  const {symbol} = useParams();
  const [chartData, setChartData] = useState([]);
  const [range, setRange] = useState('1m')
  const [interval, setInterval] = useState(1)
  const [color, setColor] = useState('#82ca9d')

  useEffect(() => {

    (async () => {
      let newData = await getTimeSeriesData(token, symbol, range, interval)
      if(newData) {
        setChartData(newData)
      } else {
        let error = 'error' //intiate error snackbar here
        console.error(error)
      }
    })()
  }, [range, interval, symbol])

  const cleanChartData = (data) => {
    if (true) {
      setColor('#ba000d')
    } else {
      setColor('#82ca9d')
    }
  }

  const handleRange = (range, interval) => {
    setInterval(interval)
    setRange(range)
  }

  return (
      <div>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart width={650} height={200} data={chartData}
              margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
              <YAxis hide={true}
              domain={['auto', 'auto']}
              />
              <XAxis dataKey="date" name='date' tickFormatter={(unixTime) => moment(unixTime).format('MMM Do YY')} />
              <Tooltip />
              <Line type='linear' dataKey='close' name='Close' dot={false} stroke={color} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <ButtonGroup color='secondary' size='small'>
          {/* <Button onClick={handleIntraDay} value={2}>1D</Button> */}
          <Button onClick={() => handleRange('1m', 1)} value={3}>1M</Button>
          <Button onClick={() => handleRange('3m', 1)} value={4}>3M</Button>
          <Button onClick={() => handleRange('1y', 5)} value={5}>1Y</Button>
          <Button onClick={() => handleRange('3y', 10)} value={1}>3Y</Button>
        </ButtonGroup>
      </div>
  )
}

export default StockRechart
