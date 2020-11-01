import React, {useState, useContext, useEffect} from 'react';
import {LineChart, Line, YAxis, Tooltip, XAxis, ResponsiveContainer} from 'recharts';
import RobinhoodContext from '../../RobinhoodContext';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper'
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

      <Paper spacing={2}>
        <div margin={{left: 5}}>
          <Typography variant='h6' padding={20}>
            Portfolio
          </Typography>
        </div>
      <div style={{width: '100%', height: 300}}>
        <ResponsiveContainer>
        <LineChart data={portfolioChartData}
        margin={{top: 5, right: 7, left: 7, bottom: 0}}>
          <YAxis hide={true}
          />
          <XAxis dataKey="date" />
          <Tooltip />
          <Line type='linear' dataKey='price' dot={false} />
          <Line type='linear' dataKey='parsedDate' dot={false} />
        </LineChart>
        </ResponsiveContainer>
      </div>

      <ButtonGroup color='secondary' size='small' margin={5}>
          <Button onClick={handleRange} value={2}>1D</Button>
          <Button onClick={handleRange} value={3}>1M</Button>
          <Button onClick={handleRange} value={4}>3M</Button>
          <Button onClick={handleRange} value={5}>1Y</Button>
          <Button onClick={handleRange} value={1}>3Y</Button>
        </ButtonGroup>
      </Paper>

  )
}

export default PortfolioChart;
