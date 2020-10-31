import React, {useState, useContext, useEffect} from 'react';
import {LineChart, Line, YAxis, Tooltip, XAxis} from 'recharts';
import RobinhoodContext from '../../RobinhoodContext';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

import {getHistoricalAssetData} from '../../fetches/asset';
import { useParams } from 'react-router-dom';



const StockRechart = () => {

  const [active, setActive] = useState('')
  const [dateRange, setDateRange] = useState(['2020-10-27', '2020-10-30'])
  const {asset, token} = useContext(RobinhoodContext)
  const [chartData, setChartData] = useState([{results: []}]);
  const [stockPrice, setStockPrice] = useState();
  const [priceChange, setPriceChange] = useState(0);
  const [percentChange, setPercentChange] = useState(0);
  const {symbol} = useParams();



  useEffect(() => {
    (async() => {
      const dataRes = await getHistoricalAssetData(token, symbol, dateRange);

      if(dataRes.status === 'ERROR') {
        console.log(dataRes.error)
      }


      if(dataRes.status === 'DELAYED' || dataRes.status === 'OK'){
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

        const priceDiff = (cleanData[0].price - cleanData[cleanData.length - 1].price).toFixed(2);
        const perc = (((cleanData[cleanData.length - 1].price / cleanData[0].price) - 1) *100).toFixed(2);

        setChartData(cleanData)
        setPriceChange(priceDiff)
        setPercentChange(perc)
      }
    })();

  },[dateRange, token, symbol]);

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

  const cleanMonth = (number) => {
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

    let parsedStart = `${start.getFullYear()}-${cleanMonth(start.getMonth()+1)}-${start.getDate()}`
    let parsedEnd = `${end.getFullYear()}-${cleanMonth(end.getMonth()+1)}-${end.getDate()}`
    console.log(parsedStart,parsedEnd)

    setDateRange([parsedStart, parsedEnd]);
  }

  const handleIntraDay = (e) => {
    console.log(chartData)
  }

  return (
    <div className="chart">
      <h1>{chartData.ticker}</h1>
      <h2>{stockPrice > 0 ? `${stockPrice}` : `-$${stockPrice}`}</h2>
      <h3>{priceChange < 0 ? `$${priceChange}` : `-$${priceChange}`}</h3>
      <h3>{percentChange}%</h3>
      <div className="stock-chart">
        <LineChart width={650} height={200} data={chartData}
        margin={{top: 5, right: 30, left: 0, bottom: 5}}>
          <YAxis hide={true}
          />
          <XAxis dataKey="date" />
          <Tooltip />
          <Line type='linear' dataKey='price' dot={false} />
          <Line type='linear' dataKey='parsedDate' dot={false} />
        </LineChart>
        <ButtonGroup color='secondary' size='small'>
          <Button onClick={handleIntraDay} value={2}>1D</Button>
          <Button onClick={() => handleRange('month', 1)} value={3}>1M</Button>
          <Button onClick={() => handleRange('month', 3)} value={4}>3M</Button>
          <Button onClick={() => handleRange('year', 1)} value={5}>1Y</Button>
          <Button onClick={() => handleRange('year', 3)} value={1}>3Y</Button>
        </ButtonGroup>
      </div>
    </div>
  )
}

export default StockRechart
