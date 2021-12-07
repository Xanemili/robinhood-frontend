import { Grid, TextField, Typography, Button, Box } from '@mui/material'
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container'
import React, { useEffect, useReducer, useState } from 'react'
import { loadUser } from '../../fetches/user'
import ProfileInput from './ProfileInput'
import * as yup from 'yup';

interface ProfileProps {

}

interface UserProfile<T> {
    [key: string] : T
    email: T
    address: T
    zipcode: T
    firstName: T
    lastName: T
    username: T
}

type Input<T> = {
  value: T
  touched: boolean
  isValid?: boolean | null
}

type ProfileActions = { type: 'updateField', field: string , data: string }
                    | { type: 'resetField', field: string }
                    | { type: 'resetForm', field: null}
                    | { type: 'loadUser', data: UserProfile<string> }
                    | { type: 'touchField', field: string, data: boolean }

const initialStrInput: Input<string> = { value: '', touched: false, isValid: null }
const initialProfile: UserProfile<Input<string>> = {
  email: initialStrInput,
  address: initialStrInput,
  zipcode: initialStrInput,
  firstName: initialStrInput,
  lastName: initialStrInput,
  username: initialStrInput
}

const profileReducer = (state: UserProfile<Input<string>>, action: ProfileActions): UserProfile<Input<string>> => {
  switch (action.type) {
    case 'touchField':
      return { ...state, [action.field]: { ...state[action.field] , touched: true } }
    case 'loadUser':
      const newProfile = { ...state }
      Object.keys(action.data).forEach((key) => {
        if(key in newProfile) {
          newProfile[key] = { touched: false, value: action.data[key] }
        }
        console.log(newProfile[key])
      })

      return newProfile
    case 'updateField':
      return { ...state, [action.field]: { ...state[action.field] ,value: action.data }}
    case 'resetField':
      return { ...state, [action.field]: { ...state[action.field], value: '' }}
    case 'resetForm':
      return initialProfile
    default:
      return state
  }
}

const profileSchema: yup.SchemaOf<UserProfile<Input<string>>> = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().required().email(),
  address: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  zipcode: yup.number().required(),
}).defined()

const Profile = (props: ProfileProps) => {

  const [disabled, setDisabled] = useState(false)
  const [user, setUser] = useReducer(profileReducer, initialProfile)
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')

  useEffect(() => {
    (async () => {
      const userData = await loadUser()
      setUser({type: 'loadUser', data: userData})
    })()
  }, [])

  const updateForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({type: 'updateField', data: event.target.value, field: event.target.id })
  }

  const submitForm = () => {

  }

  const touchField = async (event: React.FocusEvent<HTMLInputElement>) => {
    try {
      if (!user[event.target.id]) throw new yup.ValidationError('There was an Error with the Form.', event.target.id)

      const isValid = await profileSchema.validateSyncAt(`${event.target.id}`, { [event.target.id]: user[event.target.id].value })
      setUser({ type: 'touchField', field: event.target.id, data: true})
    } catch(err) {
      console.log(err)
      setUser({ type: 'touchField', field: event.target.id, data: false })
    }
  }

  return (
    <Container>
      <Paper sx={{display: 'flex', justifyContent:'space-between', flexDirection: 'column'}}>
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Typography>
            Profile
          </Typography>
          <Button color='info' onClick={() => setDisabled(!disabled)}>Edit</Button>
        </Box>
          <ProfileInput onBlur={touchField} value={user.username?.value} onChange={updateForm} label={'Username'} disabled={disabled} required color={user.username.touched ? 'success' : 'warning'} id='username'/>
          <TextField onBlur={touchField} value={user.firstName?.value} onChange={updateForm} label={'First Name'} disabled={disabled} required color='info' id='firstName'/>
          <TextField onBlur={touchField} value={user.lastName?.value} onChange={updateForm} label={'Last Name'} disabled={disabled} required color='info' id='lastName'/>
          <TextField onBlur={touchField} value={user.address?.value} onChange={updateForm} label={'Street Address'} disabled={disabled} required color='info' id='address'/>
          <TextField onBlur={touchField} value={user.zipcode?.value} onChange={updateForm} label={'Zipcode'} disabled={disabled} required color='info' id='zipcode'/>
        {disabled && <>
          <TextField type='password' value={password1} onChange={(e) => setPassword1(e.target.value)} label={'Password'} disabled={!disabled} required color='success' id='password'/>
          <TextField type='password' value={password2} onChange={(e) => setPassword2(e.target.value)} label={'Password Check'} disabled={!disabled} required id='password-check' />
        </>}
      </Paper>
    </Container>
  )
}

export default Profile
