import { createTheme } from '@mui/material/styles';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';
import { forwardRef } from 'react'

const LinkBehavior = forwardRef<
  any,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (MUI) -> to (react-router)
  return <RouterLink data-testid="custom-link" ref={ref} to={href} {...other} />;
});

const baseTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#00293D',
    },
    secondary: {
      main: '#577e99',
    },
    background: {
      default: '#00141F',
      paper: '#002233'
    },
    text: {
      primary: '#fff',
      secondary: '#fff',
      disabled: '#fff'
    },
    // shadows: [
    //   "none",
    //   "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
    // ]
  },})

const theme = createTheme(baseTheme, {
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
      fontStyle: 'bold',
      fontSize: '1.5em',
    },
    h2: {
      fontStyle: 'bold',
      fontSize: '1.25em',
      letterSpacing: '-0.2px',
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
  components: {
    MuiListSubHeader: {},
    MuiDivider: {
      variants: [
        {
          props: { variant: 'color'},
          // style: { border: `2px solid ${}`}
        }
      ]
    },
    MuiPaper: {
      variants: [
        {
          props: {vairant: 'border'}
        }
      ]
    },
    MuiLink: {
      root: {

      },
      defaultProps: {
        underline: 'hover',
        color: 'secondary',
        component: LinkBehavior,
      }
    },
    MuiListItemButton: {
      root: {
        style: {
          '&:hover': {
            border: 'white 1px dashed'
          }
        }
      },
      defaultProps: {
        focusRipple: true,
      }
    }
  }
})


export default theme;
