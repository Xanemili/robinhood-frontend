import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Divider, Typography } from '@mui/material';
import Link from '@mui/material/Link'

const CompanyInfo = ({ asset: {company} }) => {

  if (!company) {
    return null;
  }

  return (
    <Paper elevation={0} >
      <Grid container spacing={2} direction="column" justifyContent='space-evenly' >

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
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default CompanyInfo;
