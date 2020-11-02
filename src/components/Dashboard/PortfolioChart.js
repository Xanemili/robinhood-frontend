import React, {useState, useContext, useEffect} from 'react';
import {LineChart, Line, YAxis, Tooltip, XAxis, ResponsiveContainer} from 'recharts';
import RobinhoodContext from '../../RobinhoodContext';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper'
import {getPortfolioHistory} from '../../fetches/portfolio'
import moment from 'moment'
import Divider from '@material-ui/core/Divider'

const PortfolioChart = () => {

  const [active, setActive] = useState('')
  const [dateRange, setDateRange] = useState([])
  const [portfolioChartData, setPortfolioChartData] = useState([{data: {}}])
  const {token} = useContext(RobinhoodContext)
  const [priceChange, setPriceChange] = useState('')
  const [currentData, setCurrentData] =useState([{data: {}}])
  const [currentPrice, setCurrentPrice] = useState(0.00)
  const [percChange, setPercChange] = useState(0);
    const [color, setColor] = useState('#82ca9d')

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

        const priceDiff = (cleanData[cleanData.length - 1].price - cleanData[0].price).toFixed(2);
        const perc = (((cleanData[cleanData.length - 1].price / cleanData[0].price) - 1) *100).toFixed(2);

        setPortfolioChartData(cleanData)
        setCurrentData(cleanData)
        setCurrentPrice(new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(cleanData[cleanData.length -1].price))
        setPercChange(perc)

        if (priceDiff < 0) {
          setColor('#ba000d')
        } else {
          setColor('#82ca9d')
        }
        setPriceChange(new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(priceDiff));
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

    let filtered = portfolioChartData.filter(data => data.date > start)
    setDateRange([parsedStart, parsedEnd]);
    setCurrentData(filtered)
  }

  const handleIntraDay = (e) => {
    console.log(e.target)
  }

  return (

      <Paper spacing={2}>
        <div margin={{left: 5, top: 5}}>
          <Typography variant='h5' style={{marginTop: 14, marginLeft: 14}}>
            Portfolio
          </Typography>
          <Divider variant='middle'/>
          <Typography variant='h5' style={{marginLeft: 14}}>
            {currentPrice}
          </Typography>
          <Typography style={{marginLeft: 14, color: color}}>
            {priceChange}
          </Typography>
          <Typography style={{marginLeft: 14, color: color}}>
            {percChange}%
          </Typography>
        </div>
      <div style={{width: '100%', height: 300}}>
        <ResponsiveContainer>
        <LineChart data={currentData}
        margin={{top: 5, right: 7, left: 7, bottom: 0}}>
          <YAxis hide={true}/>
          <XAxis dataKey="parsedDate" hide={true}/>
          <Tooltip />
          <Line type='linear' dataKey='price' name='Value' dot={false} stroke={color}/>

        </LineChart>
        </ResponsiveContainer>
      </div>

      <ButtonGroup color='secondary' size='small' style={{margin: 1}}>
          {/* <Button onClick={handleRange} value={2}>1D</Button> */}
          <Button onClick={() => handleRange('month', 1)} value={3}>1M</Button>
          <Button onClick={() => handleRange('month', 3)} value={4}>3M</Button>
          <Button onClick={() => handleRange('year', 1)} value={5}>1Y</Button>
          <Button onClick={() => handleRange('year', 3)} value={1}>3Y</Button>
        </ButtonGroup>
      </Paper>

  )
}

/* test-tick format: tickFormatter = {(unixTime) => moment(unixTime).format('MMM Do YY')}*/

export default PortfolioChart;
