import React from 'react';
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import { useAuthDataContext } from '../Auth/AuthDataContext'
import PortfolioChart from './PortfolioChart'
import NewsContainer from './NewsContainer';
import CurrentBalance from './CurrentBalance'


const DashBoard = () => {

  const { token } = useAuthDataContext()

  return (
    <Container maxWidth={'xl'}>
      <Grid container justify='center'>
        <Grid item xs={6}>
          <Grid container direction='column' spacing={2}>
            <Grid item>
              <PortfolioChart token={token} />
            </Grid>
            < Grid item>
              <CurrentBalance />
            </Grid>
            < Grid item>
              <NewsContainer />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}


export default DashBoard;
