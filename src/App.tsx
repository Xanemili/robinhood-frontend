import Router from './Router';
import theme from './theme/muitheme'
import { ThemeProvider } from '@mui/material';
import AlertSnackbar from './features/Messages/AlertSnackbar';

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <Router />
      <AlertSnackbar />
    </ThemeProvider>
  )
}

export default App;
