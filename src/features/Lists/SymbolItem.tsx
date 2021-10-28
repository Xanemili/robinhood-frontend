import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import {Link} from 'react-router-dom'
import MLink from '@mui/material/Link'

interface SymbolItemProps {
  asset: Asset
}

type Asset = {
  symbol: string
  latestPrice?: number
}

const SymbolItem = (props: SymbolItemProps) => {
  const { asset } = props
  return (
    <ListItem alignItems='center' key={asset.symbol}>
      <ListItemText>
        <Link component={MLink} to={`/assets/${asset.symbol}`} className={'link-stocks'}>
          {asset.symbol}
        </Link>
      </ListItemText>
      <div>
        {asset.latestPrice}
      </div>
      {/* <StockPrice ticker={asset.ticker} /> */}
    </ListItem>
  )
}

export default SymbolItem
