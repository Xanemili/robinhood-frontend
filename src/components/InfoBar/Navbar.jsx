import React, { useContext, useEffect, useState } from 'react';
import clsx from 'clsx'
import { NavLink, Link } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { AppBar, Grow, Paper, ClickAwayListener, MenuList, Popper, MenuItem } from '@material-ui/core';
import { getSearch } from '../../fetches/asset';
import { AuthDataContext } from '../Auth/AuthDataContext';

export default function NavBar({ classes, drawerStatus, handleDrawer }) {


  const { token, onLogout } = useContext(AuthDataContext);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([])
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const removeToken = () => {
    localStorage.removeItem('token');
    onLogout();
  }

  useEffect(() => {
    (async () => {
      let searchArray = await getSearch(token, searchValue)
      if (searchArray) {
        setSearchResults(searchArray)
      }
    })()
  }, [searchValue, token]);

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
    <AppBar position='absolute' className={clsx(classes.appBar, drawerStatus && classes.appBarShift)}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawer}
          className={clsx(classes.menuButton, drawerStatus && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          <NavLink to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
            RobinTrades
            </NavLink>
        </Typography>
        {token ?
          <div>
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
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={(e) => handleToggle(e)}
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
                          {searchResults.map(ticker => {
                            return (
                              <MenuItem key={ticker.symbol} value={ticker.symbol}>
                                <Link to={`/assets/${ticker.symbol}`}> {ticker.symbol}</Link>
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
              <NavLink to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
                Portfolio
            </NavLink>
            </Button>
            <Button>
              <NavLink to='/profile' style={{ textDecoration: 'none', color: 'inherit' }}>
                Profile
            </NavLink>
            </Button>
            <Button onClick={removeToken}>
              Logout
          </Button>
          </div>
          : null}
        {/* <Button color="inherit">
            <NavLink to='/account'>
              Account
            </NavLink>
          </Button> */}
      </Toolbar>
    </AppBar>
  );
}
