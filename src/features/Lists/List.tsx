import React from 'react'
import {List, ListSubheader, Divider, ListItem, ListItemText} from '@material-ui/core'
import { Link } from 'react-router-dom'

type AssetListProps = {
  name: string,
  Tickers: Array<Ticker>,
}

type Ticker = {
  id: number,
  ticker: string,
}

const AssetList = ({ name, Tickers }: AssetListProps) => {

return (
  <List>
    <ListSubheader>{name}</ListSubheader>
    <Divider variant='middle'/>
    {Tickers.map(asset => (
    <ListItem alignItems='center' key={asset.ticker} className={'sidebar__ticker-portfolio'}>
      {console.log(asset)}
      <ListItemText>
        <Link to={`/assets/${asset.ticker}`} className={'link-stocks'}>
          {asset.ticker}
        </Link>
      </ListItemText>
      {/* <StockPrice ticker={asset.ticker} /> */}
    </ListItem>
  ))
}
  </List>
)}

export default AssetList
