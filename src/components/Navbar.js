import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles, fade } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import RobinhoodContext from '../RobinhoodContext'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: 'white',
    border: 0,
    borderRadius: 0,
  },
  title: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function NavBar() {
  const classes = useStyles();

  const {token, setToken} = useContext(RobinhoodContext);

  const removeToken = () => {
    localStorage.removeItem('token');
    setToken(null);
  }

  return (
      <nav>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <Button onClick={removeToken}>
            Logout
          </Button>
          <Button color="inherit">
            <NavLink to='/'>
              Portfolio
            </NavLink>
          </Button>
          <Button color="inherit">
            <NavLink to='/account'>
              Account
            </NavLink>
          </Button>
        </Toolbar>
      </nav>
  );
}
