import Router from './Router';
import theme from './theme/muitheme'
import { ThemeProvider } from '@mui/material';

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  )
}

export default App;
