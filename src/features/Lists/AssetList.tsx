import {List, ListSubheader, Divider, ListItem, ListItemText, } from '@mui/material'
import { Link } from 'react-router-dom'
import {AssetListType} from '../../store/listSlice'

const AssetList = ({Tickers, name}: AssetListType) => {

return (
  <List>
    <ListSubheader>{name}</ListSubheader>
    <Divider />
    {Tickers.map(asset => (
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
