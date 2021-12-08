import React, { useEffect, useReducer, useState, useRef } from 'react'
import { Typography, Button, Box } from '@mui/material'
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container'
import { loadUser } from '../../fetches/user'
import ProfileInput from './ProfileInput'
import { profileReducer, initialProfile, profileSchema, UserProfile  } from './profileReducer'
import { ValidationError } from 'yup'

interface ProfileProps {

}

const Profile = (props: ProfileProps) => {

  const [disabled, setDisabled] = useState(true) // CHANGE TO FALSE BEFORE COMMITTING
  const [user, setUser] = useReducer(profileReducer, initialProfile)
  const initialUser = useRef<null | UserProfile<string>>(null)

  useEffect(() => {
    (async () => {
      const userData = await loadUser()
      setUser({type: 'loadUser', data: userData})
      initialUser.current = userData
    })()
  }, [])

  const updateForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({type: 'updateField', data: event.target.value, field: event.target.id })
  }

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const values: any = {}
      Object.entries(user).forEach( ([key, value]) => {
        values[key] = user[key].value
      })
      await profileSchema.validate(values)
      console.log('test')
    } catch(err) {
      console.log(err)
    }
  }

  const touchField = async (event: React.FocusEvent<HTMLInputElement>) => {
    try {
      if (!user[event.target.id]) throw new ValidationError('There was an Error with the Form.', event.target.id)

      await profileSchema.validateSyncAt(`${event.target.id}`, { [event.target.id]: user[event.target.id].value })
      if(event.target.id === 'password' && user['confirmPassword']) {
        await profileSchema.validateSyncAt('confirmPassword', { confirmPassword: user['confirmPassword'].value})
        console.log(user[event.target.id].value, user['confirmPassword'].value)
      }
      setUser({ type: 'touchFieldValid', field: event.target.id })
    } catch(err: any) {
      console.log(err)
      setUser({ type: 'touchFieldInvalid', field: event.target.id, data: err.message })
    }
  }

  return (
    <Container>
      <Box component={"form"} onSubmit={submitForm}>
        <Paper sx={{display: 'flex', justifyContent:'space-between', flexDirection: 'column'}}>
          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography variant={'h2'} sx={{ margin: '1rem' }}>
              Profile
            </Typography>
            <Button color='info' onClick={() => setDisabled(!disabled)}>Edit</Button>
            <Button color='secondary' onClick={() => {
              if(initialUser.current) { setUser({type: 'loadUser', data: initialUser.current }) }
            }}>Reset</Button>
          </Box>
            <ProfileInput data={user.username} onBlur={touchField} onChange={updateForm} label={'Username'} disabled={disabled} required name='username' id='username'/>
            <ProfileInput data={user.email} onBlur={touchField} onChange={updateForm} label={'Email'} disabled={disabled} required id='email'/>
            <ProfileInput data={user.firstName} onBlur={touchField} onChange={updateForm} label={'First Name'} disabled={disabled} required id='firstName'/>
            <ProfileInput data={user.lastName} onBlur={touchField} onChange={updateForm} label={'Last Name'} disabled={disabled} required id='lastName'/>
            <ProfileInput data={user.address} onBlur={touchField} onChange={updateForm} label={'Street Address'} disabled={disabled} required id='address'/>
            <ProfileInput data={user.zipcode} onBlur={touchField} onChange={updateForm} label={'Zipcode'} disabled={disabled} required id='zipcode'/>
          {disabled && <>
            <ProfileInput type='password' onBlur={touchField} data={user.password} onChange={updateForm} label={'Password'} disabled={!disabled} id='password'/>
            <ProfileInput type='password' onBlur={touchField} data={user.confirmPassword} onChange={updateForm} label={'Confirm Password'} disabled={!disabled} id='confirmPassword'/>
            <Button type='submit' color='warning'>
              Update Form
            </Button>
          </>}
        </Paper>
      </Box>
    </Container>
  )
}

export default Profile
