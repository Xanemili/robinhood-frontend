import { styled } from "@mui/material/styles"
import TextField, {TextFieldProps} from '@mui/material/TextField'

type StyledInputProps = TextFieldProps & {
  valid?: boolean | null
}

const ProfileTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== '',
})<StyledInputProps>(({ valid, theme }) => ({
  width: 300,
  ...(valid && {
    border: 'green'
  })
}))

const ProfileInput = (props: StyledInputProps) => {

  return (
    <ProfileTextField
      {...props}
    />
  )
}

export default ProfileInput
