import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import {Link} from 'react-router-dom'
import MaterialLink from '@mui/material/Link'
import {IexAsset} from '../../api-types'

interface SymbolItemProps {
  asset: IexAsset
}


const SymbolItem = (props: SymbolItemProps) => {
  const { asset } = props
  return (
    <ListItem alignItems='center' key={asset.symbol}>
      <ListItemText>
        <MaterialLink component={Link} to={`/assets/${asset.symbol}`}>
          {asset.symbol}
        </MaterialLink>
      </ListItemText>
      <div>
        {asset.latestPrice}
      </div>
      {/* <StockPrice ticker={asset.ticker} /> */}
    </ListItem>
  )
}

export default SymbolItem
