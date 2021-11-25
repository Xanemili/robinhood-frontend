import {  ReactEventHandler, useState, useEffect, useRef } from "react"
import SwipeableDrawer from "@mui/material/SwipeableDrawer"
import Box from "@mui/material/Box"
import List from '@mui/material/List'
import TextField from '@mui/material/TextField'
import { Button, FormControl, InputBase, ListItem } from "@mui/material"
import { useAppSelector } from "../store/hooks"
import { selectToken } from '../store/userSlice'
import { getSearch } from '../fetches/asset';
import { styled } from "@mui/system"
import { IexAsset } from '../api-types'
import CloseIcon from '@mui/icons-material/Close';
import SymbolItem from "./Lists/SymbolItem"

interface SearchDrawerProps {
  open: boolean
  handleClose: () => void
  setOpen: (toggle: boolean) => ReactEventHandler
}

const SearchDrawer = (props: SearchDrawerProps) => {
  const { open, handleClose, setOpen } = props
  const [searchValue, setSearchValue] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const anchorRef = useRef(null)
  const searchRef = useRef(searchValue)
  const token = useAppSelector(selectToken)

  useEffect(() => {
    if(searchValue) {
      const timeOutId = setTimeout(async () => {
        console.log('showing here :)')
        let searchArray = await getSearch(token, searchValue)
        if(searchArray){
          setSearchResults(searchArray)
        }
      }, 500)
      return () => clearTimeout(timeOutId)
    }
  },[searchValue, token]);

  const CenteredTextField = styled(TextField)({
    '& input': {
      textAlign: 'center'
    }
  })

  const contents = (searchResults: Array<IexAsset>) => {
    return (
      <Box
       sx={{ width: 'auto', display: 'flex', justifyContent: 'space-between', flexDirection:'column' }}
       role='presentation'
       >
         <Box sx= {{ display: 'flex', justifyContent: 'space-between'}}>
          <FormControl fullWidth>
            <CenteredTextField
              sx={{ fontSize: '32px', textAlign: 'center'}}
              id='search-input'
              name='search-input'
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchValue}
              autoFocus
              type='textarea'
              onChange={(e)=> setSearchValue(e.target.value)}
              />
          </FormControl>
          <Button variant={'text'} color={'info'} size={'large'} startIcon={<CloseIcon />} onClick={handleClose}>
            Close
          </Button>
        </Box>
        { searchResults.length > 0 &&
          <List>
            {searchResults.map( asset => (
              <SymbolItem asset={asset} type={'descriptive'} />
              ))}
          </List>
        }
      </Box>
    )
  }

  return (
    <SwipeableDrawer
      anchor={'top'}
      open={open}
      onClose={() => {
        setSearchValue('')
        setSearchResults([])
        setOpen(false)
      }}
      onOpen={() => setOpen(true)}
      >
        {contents(searchResults)}
    </SwipeableDrawer>
  )
}

export default SearchDrawer
