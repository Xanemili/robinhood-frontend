import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Portfolio from './Portfolio'
import PortfolioChart from './PortfolioChart'
import NewsContainer from './NewsContainer';
import { useAppSelector } from '../../store/hooks';
import { selectToken } from '../../store/userSlice';
import ListSection from '../Lists/ListSection';
import SimpleConfirm from '../Messages/SimpleConfirm'
import { selectDialog } from '../../store/alertSlice'
import AddCash from './AddCash'

const DashBoard = () => {
  const token = useAppSelector(selectToken)
  const dialog = useAppSelector(selectDialog)
  if (!token) {
    return null
  }
  return (
    <Container maxWidth="">
      <SimpleConfirm open={dialog.open}/>
      <Grid sx={{ marginTop: '0px'}} container spacing={3} justifyContent='center'>
        <Grid item xs={2}>
          <Portfolio />
          <AddCash />
        </Grid>
        <Grid item xs={8}>
          <PortfolioChart />
          {/* <NewsContainer /> */}
        </Grid>
        <Grid item xs={2}>
          <ListSection />
        </Grid>
      </Grid>
    </Container>
  );
}

export default DashBoard;
