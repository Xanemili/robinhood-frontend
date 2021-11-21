import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import {Link} from 'react-router-dom'
import MaterialLink from '@mui/material/Link'
import {IexAsset} from '../../api-types'
import { IconButton } from '@mui/material'
import Remove from '@mui/icons-material/Remove'
import { useAppDispatch } from '../../store/hooks'


interface SymbolItemProps {
  asset: IexAsset
  type?: 'controlled' | 'uncontrolled'
  removeItem?: (removalItem: string) => Promise<void>
}


const SymbolItem = (props: SymbolItemProps) => {
  const { asset, type, removeItem } = props

  const handleItemRemove = () => {
    if (removeItem) {
      removeItem(asset.symbol)
    }
  }

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
      { type === 'controlled' &&
        <IconButton onClick={handleItemRemove}>
          <Remove fontSize="small" color="warning" />
        </IconButton>}
      {/* <StockPrice ticker={asset.ticker} /> */}
    </ListItem>
  )
}

export default SymbolItem
