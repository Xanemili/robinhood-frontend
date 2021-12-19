import { useState, useRef, useEffect, useCallback } from 'react'
import { NavLink } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import SearchDrawer from './SearchDrawer'
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { resetToken, selectToken } from '../store/userSlice';
import { ButtonGroup } from '@mui/material';
import { useLocation } from 'react-router-dom'

export default function NavBar() {

  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const token = useAppSelector(selectToken)
  const location = useLocation()

  const handleClose = useCallback((event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!location.state) {
      location.state = location.pathname
    }
    if (location.state !== location.pathname) {
      handleClose()
    }
  }, [location, handleClose])

  const removeToken = () => {
    localStorage.removeItem('token');
    dispatch(resetToken())
  }

  return (
    <Box>
      <AppBar position='fixed'>
        <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Typography variant="h6" noWrap component='div'>
            <NavLink to='/' style={{textDecoration: 'none', color: 'inherit'}}>
            Portfolio Watch
            </NavLink>
          </Typography>
          { token &&
            <ButtonGroup sx={{ padding: '1px 1px 1px 1px'}}>
              <Button variant='text' color='warning' onClick={() => setOpen(true)} startIcon={<SearchIcon />}>
                Search
              </Button>
              <Button variant='info' component={NavLink} to='/profile/edit'>
                Profile
              </Button>
              <Button variant='info' component={NavLink} to='/'>
                Home
              </Button>
              <Button variant='info' onClick={removeToken}>
                Logout
              </Button>
            </ButtonGroup>
          }
        </Toolbar>
      </AppBar>
      <SearchDrawer open={open} handleClose={handleClose} setOpen={setOpen}/>
    </Box>
  );
}
