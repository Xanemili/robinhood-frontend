import React, {useContext, useEffect, useState} from 'react';
import { NavLink, Link } from 'react-router-dom';
import { makeStyles, fade } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import RobinhoodContext from '../RobinhoodContext'
import { AppBar, Grow, Paper,ClickAwayListener, MenuList, Popper, MenuItem } from '@material-ui/core';
import {getSearch} from '../fetches/asset';



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
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([])
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const removeToken = () => {
    localStorage.removeItem('token');
    setToken(null);
  }

  useEffect(() => {
    (async() => {

        let searchArray = await getSearch(searchValue)
        if(searchArray.status === 'OK'){
          setSearchResults(searchArray.tickers)
        }

    })()
  },[searchValue]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open])

  return (
    <AppBar position='absolute'>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <NavLink to='/' style={{textDecoration: 'none', color: 'inherit'}}>
            RobinTrades
            </NavLink>
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
              value={searchValue}
              ref={anchorRef}
              onChange={(e)=> setSearchValue(e.target.value)}
              onFocus={(e)=> handleToggle(e)}
            />
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    {searchResults.map( ticker => {
                      return (
                        <MenuItem key={ticker.ticker} value={ticker.ticker}>
                          <Link to={`/assets/${ticker.ticker}`}> {ticker.ticker}</Link>
                        </MenuItem>
                      )
                    })}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
          </div>
          <Button>
            <NavLink to='/' style={{textDecoration: 'none', color: 'inherit'}}>
              Portfolio
            </NavLink>
          </Button>
          <Button onClick={removeToken}>
            Logout
          </Button>
          {/* <Button color="inherit">
            <NavLink to='/account'>
              Account
            </NavLink>
          </Button> */}
        </Toolbar>
      </AppBar>
  );
}
