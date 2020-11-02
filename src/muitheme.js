import { createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
  palette: {
    primary: {
      main:'#fafafa'
    },
    secondary: {
      main: '#00e676'
    },
    badColor: {
      main: '#82ca9d'
    }
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {

    },
    h2: {
      fontStyle: 'bold',
      fontSize: '1em'
    },
    h3: {

    },
    body1: {

    },
    body2: {

    },
    button: {

    }
  },
})

export default theme;
