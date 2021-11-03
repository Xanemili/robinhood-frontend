import Paper from "@mui/material/Paper"
import List from "@mui/material/MenuList"
import ClickAwayListener from "@mui/material/ClickAwayListener"
import SymbolItem from "./Lists/SymbolItem"
import { IexAsset } from "../api-types"

interface SearchPopperProps {
  handleClose: () => void
  handleListKeyDown: () => void
  open: boolean
  results: Array<IexAsset>
}

const SearchPopper = (props: SearchPopperProps) => {

  const { handleListKeyDown, open, handleClose, results } = props

  if (!results) {
    return <></>
  }

    return (
      <Paper>
        <ClickAwayListener onClickAway={handleClose}>
          <List>
            {results.map(ticker => <SymbolItem asset={ticker}/>)}
          </List>
        </ClickAwayListener>
      </Paper>
    )
}

export default SearchPopper
