import Button from '@mui/material/Button'
import {addCash} from '../../fetches/portfolio'

const AddCash = () => {

  return (
    <Button onClick={e => addCash()}>
      Add Cash
    </Button>
  )
}

export default AddCash
