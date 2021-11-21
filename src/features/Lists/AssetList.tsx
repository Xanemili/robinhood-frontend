import { MouseEvent, useState} from 'react'
import {List, ListSubheader, Divider, IconButton, Menu, } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ListIconMenu from './ListIconMenu'
import {AssetListType} from '../../store/listSlice'
import SymbolItem from './SymbolItem';
import { deleteListItem } from '../../fetches/list'

interface AssetListProps extends AssetListType {

}

const AssetList = (props: AssetListProps) => {
  const {symbols, name, id} = props
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  };

  const removeItem = async (removalSymbol: string) => {
    await deleteListItem(id, removalSymbol)
  }

  return (
    <List
      subheader={
      <ListSubheader sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        {name}
        <IconButton
          id="list-controls"
          aria-haspopup="true"
          onClick={handleClick}
          color='secondary'>
        <MoreHorizIcon />
        </IconButton>
      </ListSubheader>}
    >
      <Divider />
      <Menu id='list-control-menu' open={open} anchorEl={anchorEl} onClose={handleClose}>
        <ListIconMenu id={id}/>
      </Menu>
      {symbols && symbols.map(asset => (
        <SymbolItem key={asset.id} asset={asset} type={'controlled'} removeItem={removeItem}/>
      ))}
    </List>
  )
}

export default AssetList
