import React, {useState, useContext, useEffect} from 'react';
import {LineChart, Line, YAxis, Tooltip, XAxis, ResponsiveContainer} from 'recharts';
import RobinhoodContext from '../../RobinhoodContext';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

import {getHistoricalAssetData} from '../../fetches/asset';
import { useParams } from 'react-router-dom';
import moment from 'moment'
import { Typography, Paper } from '@material-ui/core';



const StockRechart = ({data}) => {

  // const [active, setActive] = useState('')
  const [dateRange, setDateRange] = useState(['2020-10-01', '2020-10-30'])
  const {token, assetPrice, setAssetPrice} = useContext(RobinhoodContext)
  const [chartData, setChartData] = useState([{results: []}]);
  const [priceChange, setPriceChange] = useState(0);
  const [percentChange, setPercentChange] = useState(0);
  const {symbol} = useParams();
  const [color, setColor] = useState('#82ca9d')


  useEffect(() => {
    (async() => {
      const dataRes = await getHistoricalAssetData(token, symbol, dateRange);

      if(dataRes.status === 'ERROR') {
        return;
      }

      if(){
        let cleanData = dataRes.results.map(day => {
          let date = new Date()
          date.setTime(day.t);

          let parsedDate = `${setMonth(date.getMonth())} ${date.getDate()}, ${date.getFullYear()}`
          return (
            {
              date,
              parsedDate,
              vw: day.vw,
              price: day.c
            }
          )
        });

        const priceDiff = (cleanData[cleanData.length - 1].price - cleanData[0].price).toFixed(2);
        const perc = (((cleanData[cleanData.length - 1].price / cleanData[0].price) - 1) *100).toFixed(2);

        setChartData(cleanData)
        setPriceChange(priceDiff)
        setPercentChange(perc)
        setAssetPrice(cleanData[cleanData.length - 1].price)

        if(priceDiff < 0){
          setColor('#ba000d')
        } else {
          setColor('#82ca9d')
        }
      }
    })();

  },[data]);

  const setMonth = (number) => {
    const MONTHS = {
      0: "Jan",
      1: "Feb",
      2: "Mar",
      3: "Apr",
      4: "May",
      5: "Jun",
      6: "Jul",
      7: "Aug",
      8: "Sep",
      9: "Oct",
      10: "Nov",
      11: "Dec"
    };

    return MONTHS[number];
  }

  const cleanDate = (number) => {
    if(number < 10){
      return '0'+number
    } else {
      return number
    }
  }


  const handleRange = (period, size) => {
    let start = new Date();
    switch( period ){
      case 'month':
        start.setMonth(start.getMonth() - size);
        break;
      case 'year':
        start.setFullYear(start.getFullYear() - size);
        break;
      default:
        return;
    }

    let end = new Date();

    let parsedStart = `${start.getFullYear()}-${cleanDate(start.getMonth()+1)}-${cleanDate(start.getDate())}`
    let parsedEnd = `${end.getFullYear()}-${cleanDate(end.getMonth()+1)}-${cleanDate(end.getDate())}`

    setDateRange([parsedStart, parsedEnd]);
  }

  return (
    <Paper className="chart" style={{marginBottom:10}}>
      <div style={{marginLeft: 14}}>
      <Typography variant={'h5'}>{symbol}</Typography>
      <Typography variant='h5'>{assetPrice > 0 ? `${assetPrice}` : `${assetPrice}`} </Typography>
      <Typography style={{ color: color }}>{priceChange < 0 ? `$${priceChange}` : `$${priceChange}`}</Typography>
      <Typography style={{ color: color, fontWeight: 'bold' }}>{percentChange}%</Typography>
      </div>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
        <LineChart width={650} height={200} data={chartData}
        margin={{top: 5, right: 30, left: 10, bottom: 5}}>
          <YAxis hide={true}
          />
          <XAxis dataKey="parsedDate" name='date' tickFormatter={(unixTime) => moment(unixTime).format('MMM Do YY')} />
          <Tooltip />
          <Line type='linear' dataKey='price' name='Price' dot={false} stroke={color}/>
        </LineChart>
        </ResponsiveContainer>
      </div>
        <ButtonGroup color='secondary' size='small'>
          {/* <Button onClick={handleIntraDay} value={2}>1D</Button> */}
          <Button onClick={() => handleRange('month', 1)} value={3}>1M</Button>
          <Button onClick={() => handleRange('month', 3)} value={4}>3M</Button>
          <Button onClick={() => handleRange('year', 1)} value={5}>1Y</Button>
          <Button onClick={() => handleRange('year', 3)} value={1}>3Y</Button>
        </ButtonGroup>
    </Paper>
  )
}

export default StockRechart
