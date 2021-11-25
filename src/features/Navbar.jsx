import { useState, useRef } from 'react'
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
import { ButtonGroup, IconButton } from '@mui/material';

export default function NavBar() {

  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const removeToken = () => {
    localStorage.removeItem('token');
    dispatch(resetToken())
  }

  const token = useAppSelector(selectToken)

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

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
              <Button variant='info' component={NavLink} to='/'>
                Portfolio
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
