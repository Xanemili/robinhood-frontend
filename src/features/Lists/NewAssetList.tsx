import { useState } from 'react'
import { TextField, Button, InputLabel } from '@mui/material'
import Box from '@mui/material/Box'

type NewAssetListProps = {
  setIsNewList: Function,
}

const NewAssetList = ({setIsNewList}: NewAssetListProps) => {
  const [errorText, setErrorText] = useState('')

  return (
    <Box component="form" sx={{px: 2, py: 1}}>
      <InputLabel>
        New List
      </InputLabel>
      <TextField
        hiddenLabel
        fullWidth
        size="small"
        variant='outlined'
        color='primary'
        helperText={errorText}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-around'}}>
        <Button color="info" onClick={() => setIsNewList(false)}>
          Cancel
        </Button>
        <Button color="success" onClick={() => {}}>
          Create
        </Button>
      </Box>
    </Box>
  )
}

export default NewAssetList
