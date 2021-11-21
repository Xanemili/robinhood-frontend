import { useState, useEffect } from 'react';
import { MenuItem, Typography, Button, Grid, InputLabel, FormControl } from '@mui/material';
import { addListItem, deleteListItem } from '../../fetches/list';
import { selectLists } from '../../store/listSlice'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useAppSelector } from '../../store/hooks';

interface WatchListDropDownProps {
  symbol: string
}

const WatchListDropDown = (props: WatchListDropDownProps) => {
  const { symbol } = props
  const [selectedList, setSelectedList] = useState('')
  const lists = useAppSelector(selectLists)

  useEffect(() => {
    if( lists.data ) {
      setSelectedList(Object.values(lists.data)[0].id.toString())
      console.log(Object.values(lists.data)[0].id.toString())
    }
  }, [lists])

  return (

    <Grid container justifyContent='center' style={{ padding: 12 }}>
      <FormControl variant={'filled'}>
        <InputLabel id='list-select-label'>
          Selected List
        </InputLabel>
        <Select
          labelId="list-select"
          id="list-select"
          value={selectedList}
          label={'List'}
          onChange={(e: SelectChangeEvent) => setSelectedList(e.target.value)}
          color='secondary'
          >
          {lists.data && Object.values(lists.data).map((list) => {
            return(
              <MenuItem key={list.id} value={list.id}>
              <Typography variant={'h5'}>
                {list.name}
              </Typography>
            </MenuItem>
            )
          })}
        </Select>
      </FormControl>
      <Button color='secondary' variant='outlined' onClick={() => addListItem(selectedList, symbol)} >
        Add To List
      </Button>
    </Grid>
  )
}

export default WatchListDropDown
