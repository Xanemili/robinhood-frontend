import React, { useState } from 'react'
import { TextField, Button, InputLabel } from '@mui/material'
import Box from '@mui/material/Box'
import { createList } from '../../fetches/list'

type NewAssetListProps = {
  setIsNewList: Function,
}

const NewAssetList = ({setIsNewList}: NewAssetListProps) => {
  const [errorText, setErrorText] = useState('')
  const [name, setName] = useState('')
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

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
        value={name}
        onChange={handleChange}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-around'}}>
        <Button color="info" onClick={() => setIsNewList(false)}>
          Cancel
        </Button>
        <Button color="success" onClick={() => createList({name: name})}>
          Create
        </Button>
      </Box>
    </Box>
  )
}

export default NewAssetList
