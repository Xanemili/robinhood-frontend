import TextField, {TextFieldProps} from '@mui/material/TextField'
import { ValidInput } from './profileReducer'
import InputAdornment from '@mui/material/InputAdornment';
import CheckIcon from '@mui/icons-material/Check';

type StyledInputProps = TextFieldProps & {
  valid?: boolean
  touched?: boolean
  data?: ValidInput<string>
}

const ProfileInput = (props: StyledInputProps) => {

  const { data } = props

  const error = data && data.isValid === false
  const helperText = data && data.inputHelperText
  const value = data && data.value
  const valid = data && data.touched && data.isValid

  return (
    <TextField
      error={error}
      helperText={helperText}
      value={value}
      variant={'outlined'}
      sx={{ margin: '0.5rem' }}
      // color={color}
      InputProps={{
        endAdornment: valid && <CheckIcon color={'success'} />
      }}
      {...props}
    />
  )
}

export default ProfileInput
