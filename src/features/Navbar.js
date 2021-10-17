import React, { useEffect, useState} from 'react';
import { NavLink, Link } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { AppBar, Grow, Paper,ClickAwayListener, MenuList, Popper, MenuItem } from '@mui/material';
import {getSearch} from '../fetches/asset';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectToken, resetToken } from '../store/userSlice';

export default function NavBar() {

  const dispatch = useAppDispatch()
  const token = useAppSelector(selectToken)
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([])
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const removeToken = () => {
    localStorage.removeItem('token');
    dispatch(resetToken())
  }

  useEffect(() => {
    (async() => {
        let searchArray = await getSearch(token, searchValue)
        if(searchArray){
          setSearchResults(searchArray)
        }

    })()
  },[searchValue, token]);

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
    <AppBar position='fixed'>
      <Toolbar>
        <Typography variant="h6">
          <NavLink to='/' style={{textDecoration: 'none', color: 'inherit'}}>
          Portfolio Watch
          </NavLink>
        </Typography>
        <div>
            <SearchIcon />
          <InputBase
            placeholder="Search…"
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
          <NavLink to='/'>
            Portfolio
          </NavLink>
        </Button>
        <Button onClick={removeToken}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
