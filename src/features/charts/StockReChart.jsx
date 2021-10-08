import React, { useState, useEffect } from 'react';
import { LineChart, Line, YAxis, Tooltip, XAxis, ResponsiveContainer } from 'recharts';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import moment from 'moment'
import { getTimeSeriesData } from '../../fetches/asset'
import { useAppSelector } from '../../hooks';
import { selectToken } from '../../store/userSlice';

const StockRechart = ({ asset: { chart: data } }) => {

  const [chartData, setChartData] = useState(data);
  const [color, setColor] = useState('#82ca9d')
  const token = useAppSelector(selectToken)

  useEffect(() => {
    if (chartData === data) {
      return
    }
    setChartData(data)
  }, [data])

  const cleanChartData = (data) => {
    if (true) {
      setColor('#ba000d')
    } else {
      setColor('#82ca9d')
    }
  }

  const handleRange = async (period) => {
    let newData = await getTimeSeriesData(token, 'aapl', period)
    console.log(newData)
    if (!newData.errors) {
      setChartData(newData)
    } else {
      let error = 'error' // error popup here
    }
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
              <XAxis reversed dataKey="date" name='date' tickFormatter={(unixTime) => moment(unixTime).format('MMM Do YY')} />
              <Tooltip />
              <Line type='linear' dataKey='close' name='Close' dot={false} stroke={color} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <ButtonGroup color='secondary' size='small'>
          {/* <Button onClick={handleIntraDay} value={2}>1D</Button> */}
          <Button onClick={() => handleRange('1m')} value={3}>1M</Button>
          <Button onClick={() => handleRange('3m')} value={4}>3M</Button>
          <Button onClick={() => handleRange('1y')} value={5}>1Y</Button>
          <Button onClick={() => handleRange('3y')} value={1}>3Y</Button>
        </ButtonGroup>
      </div>
  )
}

export default StockRechart
