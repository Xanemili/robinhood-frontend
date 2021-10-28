import { useEffect, useState } from 'react';
import { getLists, getMovers } from '../../fetches/list';
import { CircularProgress, List, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectToken } from '../../store/userSlice';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import AssetList from './AssetList';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
import NewAssetList from './NewAssetList'
import { selectLists } from '../../store/listSlice';
import SymbolItem from './SymbolItem';

interface iexAsset {
  symbol: string
  latestPrice: number
}

const ListSection = () => {

  const lists = useAppSelector(selectLists)
  const dispatch = useAppDispatch()
  const token = useAppSelector(selectToken)

  const [isNewList, setIsNewList] = useState(false)
  const [gainers, setGainers] = useState([])
  const [losers, setLosers] = useState([])

  useEffect(() => {
      (async () => { await getLists(token) })();
      (async () => {
        const {gainers, losers} = await getMovers()
        setGainers(gainers)
        setLosers(losers)
      })();

  }, [ token, dispatch ])

  if(lists.status === 'loading') {
    return <CircularProgress />
  }

  return (
    <>
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
        {Object.entries(lists.data).map( ([id, list]) => (<AssetList {...list} key={id}/>))}
      </Paper>
      <Paper>
        <Typography variant="h2" sx={{ p: 2}}>
          Gainers
        </Typography>
        <List>
          <Divider />
          {gainers.map( (asset: iexAsset) => <SymbolItem asset={asset}/>)}
        </List>
      </Paper>
      <Paper>
        <Typography variant='h2' sx={{ p: 2}}>
          Losers
        </Typography>
        <List>
          <Divider />
          {losers.map( (asset: iexAsset) => <SymbolItem asset={asset}/>)}
        </List>
      </Paper>
    </>
  )
}

export default ListSection;
