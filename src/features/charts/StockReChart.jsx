import { useState  } from 'react';
import { LineChart, Line, YAxis, Tooltip, XAxis, ResponsiveContainer } from 'recharts';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import moment from 'moment'
import Box from '@mui/system/Box';
import { Typography } from '@mui/material';
import XTooltip from './XTooltip';

const StockRechart = (props) => {

  const { chartData, handleRange } = props
  const [color, setColor] = useState('#82ca9d')

  return (
      <Box>
        <ResponsiveContainer minHeight={300}>
          <LineChart width={650} height={200} data={chartData}
            margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
            <YAxis hide={true}
            domain={['auto', 'auto']}
            />
            <XAxis dataKey="date" name='date' tickFormatter={(unixTime) => moment(unixTime).format('MMM Do YY')} />
            <Tooltip content={<XTooltip />}/>
            <Line type='linear' dataKey='close' name='Close' dot={false} stroke={color} />
          </LineChart>
        </ResponsiveContainer>
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
          <ButtonGroup color='secondary' size='small'>
            {/* <Button onClick={handleIntraDay} value={2}>1D</Button> */}
            <Button onClick={() => handleRange('1m', 1)} value={3}>1M</Button>
            <Button onClick={() => handleRange('3m', 1)} value={4}>3M</Button>
            <Button onClick={() => handleRange('1y', 5)} value={5}>1Y</Button>
            <Button onClick={() => handleRange('3y', 10)} value={1}>3Y</Button>
          </ButtonGroup>
          <Typography variant={'body2'}>
            prices shown are delayed by 15mins
          </Typography>
        </Box>
      </Box>
  )
}

export default StockRechart
