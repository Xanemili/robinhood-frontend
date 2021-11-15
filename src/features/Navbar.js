import React, { useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';

import SearchPopper from './SearchPopper'
import { getSearch } from '../fetches/asset';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectToken, resetToken } from '../store/userSlice';
import { ButtonGroup } from '@mui/material';

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
    <Box>
      <AppBar position='fixed'>
        <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Typography variant="h6" noWrap component='div'>
            <NavLink to='/' style={{textDecoration: 'none', color: 'inherit'}}>
            Portfolio Watch
            </NavLink>
          </Typography>
          <Box sx={{ alignItems: 'center', display: 'flex', padding: '1px 1px 1px 1px'}}>
            <SearchIcon sx={{padding: '4px 0 5px 0'}}/>
            <InputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchValue}
              ref={anchorRef}
              onChange={(e)=> setSearchValue(e.target.value)}
              onFocus={(e)=> handleToggle(e)}
              />
            <SearchPopper />
          </Box>
          <ButtonGroup>
            <Button>
              <NavLink to='/'>
                Portfolio
              </NavLink>
            </Button>
            <Button variant='info' onClick={removeToken}>
              Logout
            </Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
