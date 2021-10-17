import { useEffect, useState } from 'react';
import { getLists } from '../../fetches/list';
import { CircularProgress, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectToken } from '../../store/userSlice';
import ErrorBoundary from '../ErrorBoundary';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import AssetList from './AssetList';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
import NewAssetList from './NewAssetList'
import { selectLists } from '../../store/listSlice';

const ListSection = () => {

  const lists = useAppSelector(selectLists)
  const dispatch = useAppDispatch()
  const token = useAppSelector(selectToken)

  const [isNewList, setIsNewList] = useState(false)

  useEffect(() => {
      (async () => { await getLists(token) })()
  }, [ token, dispatch ])

  if(!lists || Object.keys(lists).length === 0) {
    return <CircularProgress />
  }

  return (
    <ErrorBoundary fallback={<h2>Could not fetch watchlist </h2>}>
      <Paper variant="outlined">
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h2" sx={{ p:2 }}>
            My Lists
          </Typography>
          <Button color="secondary" onClick={() => setIsNewList(true)}>
            <AddIcon />
          </Button>
        </Box>
        <Divider sx={{ borderColor: 'info.main' }}/>
        {isNewList && <NewAssetList setIsNewList={setIsNewList} />}
        {Object.entries(lists).map( ([id, list]) => {
          return <AssetList {...list} key={id}/>})
        }
      </Paper>
    </ErrorBoundary>
  )
}

export default ListSection;
