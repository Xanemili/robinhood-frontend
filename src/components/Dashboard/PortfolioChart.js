import React, {useState, useContext, useEffect} from 'react';
import {LineChart, Line, YAxis, Tooltip, XAxis} from 'recharts';
import RobinhoodContext from '../../RobinhoodContext';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import {getPortfolioHistory} from '../../fetches/portfolio'

const PortfolioChart = () => {

  const [active, setActive] = useState('')
  const [dateRange, setDateRange] = useState([])
  const [portfolioChartData, setPortfolioChartData] = useState([{data: {}}])
  const {token} = useContext(RobinhoodContext)

  useEffect(()=> {
    (async() => {
      const response = await getPortfolioHistory(token);

      if(response){

        const cleanData = response.portfolio.map(day => {
          let date = new Date(Date.parse(day.updatedAt.toString()))

          let parsedDate = `${setMonth(date.getMonth())}, ${date.getDate()}, ${date.getFullYear()}`

          return ({
            date,
            parsedDate,
            price: day.tradeTotal
          })
        });

        setPortfolioChartData(cleanData)
      }
    })();
  }, [setPortfolioChartData, token])

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
    if (number < 10) {
      return '0' + number
    } else {
      return number
    }
  }


  const handleRange = (period, size) => {
    let start = new Date();
    switch (period) {
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

  const handleIntraDay = (e) => {
    console.log(e.target)
  }

  return (
    <div className="chart">
      <div className="stock-chart">
        <LineChart width={650} height={200} data={portfolioChartData}
        margin={{top: 5, right: 30, left: 0, bottom: 5}}>
          <YAxis hide={true}
          />
          <XAxis dataKey="date" />
          <Tooltip />
          <Line type='linear' dataKey='price' dot={false} />
          <Line type='linear' dataKey='parsedDate' dot={false} />
        </LineChart>
        <ButtonGroup color='primary' size='small'>
          <Button onClick={handleRange} value={2}>1D</Button>
          <Button onClick={handleRange} value={3}>1M</Button>
          <Button onClick={handleRange} value={4}>3M</Button>
          <Button onClick={handleRange} value={5}>1Y</Button>
          <Button onClick={handleRange} value={1}>3Y</Button>
        </ButtonGroup>
      </div>
    </div>
  )
}

export default PortfolioChart;
