import Router from './Router';
import theme from './muitheme'
import {ThemeProvider} from '@material-ui/core'


const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  )
}

export default App;
