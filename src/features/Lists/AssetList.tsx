import {List, ListSubheader, Divider, Button, Menu, } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ListIconMenu from './ListIconMenu'
import {AssetListType} from '../../store/listSlice'
import SymbolItem from './SymbolItem';
import React from 'react'

const AssetList = (props: AssetListType) => {
  const {Tickers, name, id} = props
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  };

return (
  <List
    subheader={
    <ListSubheader sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      {name}
      <Button
        id="list-controls"
        aria-haspopup="true"
        onClick={handleClick}
        color='secondary'>
      <MoreHorizIcon />
      </Button>
    </ListSubheader>}
  >
    <Divider />
    <Menu id='list-control-menu' open={open} anchorEl={anchorEl} onClose={handleClose}>
      <ListIconMenu id={id}/>
    </Menu>
    {Tickers && Tickers.map(asset => (
      <SymbolItem asset={asset}/>
    ))}
  </List>
)}

export default AssetList
