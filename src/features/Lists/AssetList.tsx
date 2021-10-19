import {List, ListSubheader, Divider, ListItem, ListItemText, Button, Menu } from '@mui/material'
import { Link } from 'react-router-dom'
import ListIconMenu from './ListIconMenu'
import {AssetListType} from '../../store/listSlice'
import React from 'react'

const AssetList = ({Tickers, name}: AssetListType) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  };

return (
  <List>
    <ListSubheader>{name}</ListSubheader>
    <Divider />
    <Button
    id="list-controls"
    aria-haspopup="true"
    onClick={handleClick}>
      open
    </Button>
    <Menu id='list-control-menu' open={open} anchorEl={anchorEl} onClose={handleClose}>
      <ListIconMenu />
    </Menu>
    {Tickers && Tickers.map(asset => (
      <ListItem alignItems='center' key={asset.ticker}>
        <ListItemText>
          <Link to={`/assets/${asset.ticker}`} className={'link-stocks'}>
            {asset.ticker}
          </Link>
        </ListItemText>
        {/* <StockPrice ticker={asset.ticker} /> */}
      </ListItem>
    ))}
  </List>
)}

export default AssetList
