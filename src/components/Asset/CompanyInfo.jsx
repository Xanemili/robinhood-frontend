import React, {useContext} from 'react';
import RobinhoodContext from '../../RobinhoodContext';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Divider, Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link'

const CompanyInfo = () => {
  const {asset: {companyInfo}} = useContext(RobinhoodContext);

  if(!companyInfo) {
    return null;
  }
  return(
    <>

    <Grid container spacing={2} direction="column" justify='space-evenly'>
      <Grid item >
        <Paper elevation={0}>
          <Typography variant='h2'>
            CEO
          </Typography>
        <div>{companyInfo.ceo}</div>
        </Paper>
      </Grid>
      <Grid item xs={10} >
        Description: {companyInfo.description}
      </Grid>
      <Grid item xs={4} >
        Industry: {companyInfo.industry}
      </Grid>
    </Grid>

    <Grid container spacing={2} direction="column">
      <Grid item xs={5}>
        Sector: {companyInfo.sector}
      </Grid>
      <Grid item >
        {companyInfo.name}
      </Grid>
      <Grid item >
        <Paper elevation={0}>

        <Typography variant='h2'>
          Company Website: <Link href={companyInfo.url} color='secondary'> {companyInfo.url}</Link>
        </Typography>
        </Paper>
      </Grid>
      <Grid item>

        <Paper >
        <Typography variant='h2'>
          Related Tickers:
        </Typography>
        {companyInfo.similar.map( ticker => {
          return (
            <Link href={`/assets/${ticker}`} onClick={(e) => e.preventDefault} key={ticker}>
              <Button>
                {ticker}
              </Button>
            </Link>
          )})}
        </Paper>
      </Grid>
     </Grid>
     </>
  )
}

export default CompanyInfo;
