import Grid from '@mui/material/Grid'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Portfolio from './Portfolio'
import NavBar from '../Navbar'
import PortfolioChart from './PortfolioChart'
import NewsContainer from './NewsContainer';
import CurrentBalance from './CurrentBalance'
import { useAppSelector } from '../../store/hooks';
import { selectToken } from '../../store/userSlice';
import ListSection from '../Lists/ListSection';
import { Toolbar } from '@mui/material'
import SimpleConfirm from '../Messages/SimpleConfirm'
import { selectDialog } from '../../store/alertSlice'

const DashBoard = () => {
  const token = useAppSelector(selectToken)
  const dialog = useAppSelector(selectDialog)
  if (!token) {
    return null
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <NavBar />
      { /*implement drawer as portfolio? */}
      <Box component="main" sx={{ flexGrow: 1, height: '100vh', overflow: 'auto' }}>
        <Toolbar />
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <SimpleConfirm open={dialog.open}/>
          <Grid container spacing={3} justifyContent='center'>
            <Grid item xs={2}>
              {/* <Portfolio /> */}
            </Grid>
            <Grid item xs={8}>
              {/* <PortfolioChart /> */}
              {/* <CurrentBalance /> */}
              {/* <NewsContainer /> */}
            </Grid>
            <Grid item xs={2}>
              <ListSection />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default DashBoard;
