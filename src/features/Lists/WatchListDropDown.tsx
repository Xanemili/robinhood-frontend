import { useState, useEffect } from 'react';
import { MenuItem, Typography, Button, Grid, InputLabel, FormControl } from '@mui/material';
import { addListItem, getLists } from '../../fetches/list';
import { selectLists } from '../../store/listSlice'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useAppDispatch, useAppSelector } from '../../store/hooks';

interface WatchListDropDownProps {
  symbol: string
}

const WatchListDropDown = (props: WatchListDropDownProps) => {
  const { symbol } = props
  const [selectedList, setSelectedList] = useState('')
  const lists = useAppSelector(selectLists)
  // const dispatch = useAppDispatch()

  useEffect(() => {
    if( lists.data && Object.keys(lists.data).length > 0 ) {
      if (selectedList === '') {
        setSelectedList(Object.values(lists.data)[0].id.toString())
      }
    } else {
      (async () => { await getLists() })();
    }
  }, [ lists, selectedList ])

  return (

    <Grid container justifyContent='center' style={{ padding: 12 }}>
      <Grid item xs={8}>
        <FormControl variant={'filled'} fullWidth>
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
      </Grid>
      <Grid item xs={4}>
        <Button color='secondary' variant='outlined' onClick={(e) => addListItem(selectedList, symbol)} >
          Add To List
        </Button>
      </Grid>
    </Grid>
  )
}

export default WatchListDropDown
