import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import {Link} from 'react-router-dom'
import {IexAsset} from '../../api-types'
import { IconButton, ListItemButton, Typography } from '@mui/material'
import Remove from '@mui/icons-material/Remove'


interface SymbolItemProps {
  asset: IexAsset
  type?: 'controlled' | 'uncontrolled' | 'descriptive'
  removeItem?: (removalItem: string) => Promise<void>
  extraAction?: () => void
}


const SymbolItem = (props: SymbolItemProps) => {
  const { asset, type, removeItem, extraAction } = props

  const handleItemRemove = () => {
    if (removeItem) {
      removeItem(asset.symbol)
    }
  }

  return (
    <ListItem alignItems='center' key={asset.symbol}>
      <ListItemButton sx={{'&:hover': { backgroundColor: 'gray'}}} component={Link} to={`/assets/${asset.symbol}`}
        onClick={() => extraAction ? extraAction() : null }>
        <ListItemText>
            {asset.symbol}
            {type === 'descriptive' &&
              <Typography>
                {asset.name} - {asset.securityType}
              </Typography>
            }
        </ListItemText>
        <Typography>
          {asset.latestPrice}
        </Typography>
      </ListItemButton>
      { type === 'controlled' &&
        <IconButton onClick={handleItemRemove} title={"Remove Item"} >
          <Remove fontSize="small" color="warning" aria-label={'Remove List Item'}/>
        </IconButton>}
      {/* <StockPrice ticker={asset.ticker} /> */}
    </ListItem>
  )
}

export default SymbolItem
