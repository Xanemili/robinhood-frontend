import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Container, Divider, Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link'

const CompanyInfo = ({ asset: {company, peers} }) => {

  if (!company) {
    return null;
  }
  return (
    <Container style={{ margin: 10 }}>

      <Paper elevation={0} >
        <Grid container spacing={2} direction="column" justify='space-evenly' >

          <Grid item >
            <Paper elevation={0} style={{ marginLeft: 10 }}>

              <Typography variant='h6'>
                {company.companyName}
              </Typography>
              <Divider />
            </Paper>

          </Grid>
          <Grid item >
            <Paper elevation={0} style={{ marginLeft: 10 }}>
              <Typography variant='h2'>
                CEO: <span color={{ color: 'grey' }}>{company.CEO}</span>
              </Typography>
            </Paper>
          </Grid>


          <Grid item xs={10} >
            <Paper elevation={0} style={{ marginLeft: 10 }}>
              {company.description}
            </Paper>
          </Grid>
          <Grid item xs={4} >
            <Paper elevation={0} style={{ marginLeft: 10 }}>
              {company.sector} | {company.industry}
            </Paper>
          </Grid>

          <Grid item >
            <Paper elevation={0} style={{ padding: 10 }}>
              <Typography variant='h2'>
                Company Website: <Link href={company.website} color='secondary'> {company.website}</Link>
              </Typography>
            </Paper>
          </Grid>
          <Grid item>

            <Paper style={{ padding: 10 }}>
              <Typography variant='h6'>
                Related Tickers:
        </Typography>
              <Divider />
              {peers.map(ticker => {
                return (
                  <Link href={`/assets/${ticker}`} onClick={(e) => e.preventDefault} key={ticker}>
                    <Button>
                      {ticker}
                    </Button>
                  </Link>
                )
              })}
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>

  )
}

export default CompanyInfo;
