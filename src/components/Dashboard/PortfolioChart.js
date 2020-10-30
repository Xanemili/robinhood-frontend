import React, {useState, useContext} from 'react';
import {LineChart, Line, YAxis, Tooltip, XAxis} from 'recharts';
import RobinhoodContext from '../../RobinhoodContext';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

const PortfolioChart = () => {

  const [active, setActive] = useState('')
  const [dateRange, setDateRange] = useState([])
  const {} = useContext(RobinhoodContext)

  const render1DChart = () => {

  }

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

  const testData = [{
    t: 1604052951230627600,
    vw: 12,
    price: 13
  }, {
    t: 1604052951230627600,
    vw: 12,
    price: 14
  }]

  const cleanData = testData.map( day => {
    let date = new Date()
    date.setTime(day.t);

    let parsedDate = `${setMonth(date.getMonth())}, ${date.getDay()}, ${date.getFullYear()}`
    return (
      {
        date,
        parsedDate,
        vw: day.vw,
        price: day.c
      }
    )
  })

  console.log(cleanData)

  const handleRange = (e) => {
    let start = new Date();
    start.setMonth(start.getMonth() - 1)
    let end = new Date();

    let parsedStart = `${start.getFullYear()}-${start.getMonth()+1}-${start.getDay()}`
    let parsedEnd = `${end.getFullYear()}-${end.getMonth()+1}-${end.getDay()}`

    setDateRange([parsedStart, parsedEnd]);
    console.log(dateRange);
  }

  const handleIntraDay = (e) => {
    console.log(e.target)
  }

  return (
    <div className="chart">
      <div className="stock-chart">
        <LineChart width={650} height={200} data={cleanData}
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
