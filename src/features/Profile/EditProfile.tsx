import React, { useEffect, useReducer, useState, useRef } from 'react'
import { Typography, Button, Box } from '@mui/material'
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container'
import { loadUser, updateProfile } from '../../fetches/user'
import ProfileInput from './ProfileInput'
import { profileReducer, initialProfile, profileSchema, UserProfile  } from './profileReducer'
import { ValidationError } from 'yup'

interface ProfileProps {

}

const Profile = (props: ProfileProps) => {

  const [isDisabled, setIsDisabled] = useState(true)
  const [isPasswordDisabled, setIsPasswordDisabled] = useState(true)
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

  const togglePasswordChange = () => {

    if(!isPasswordDisabled) {
      setUser({type: 'resetFields', fields: ['confirmPassword', 'password'] })
    }
    setIsPasswordDisabled(!isPasswordDisabled)

  }

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('test')
    try {
      const values: any = {}
      Object.entries(user).forEach( ([key, value]) => {
        values[key] = user[key].value
      })

      await profileSchema.validate(values)
      delete values.confirmPassword

      await updateProfile(values)
    } catch(err) {
      console.log(err)
    }
  }

  const touchField = async (event: React.FocusEvent<HTMLInputElement>) => {
    try {
      if (!user[event.target.id]) throw new ValidationError('There was an Error with the Form.', event.target.id)
      console.log(user[event.target.id])
      if(event.target.id === 'password' && user['confirmPassword']) {
        await profileSchema.validateSyncAt('confirmPassword', { confirmPassword: user['confirmPassword'].value})
      } else {
        await profileSchema.validateSyncAt(`${event.target.id}`, { [event.target.id]: user[event.target.id].value })
      }
      setUser({ type: 'touchFieldValid', field: event.target.id })
    } catch(err: any) {
      console.log(err)
      setUser({ type: 'touchFieldInvalid', field: event.target.id, data: err.message })
    }
  }

  return (
    <Container sx={{marginTop: '1rem'}}>
      <Paper component={'form'} onSubmit={submitForm} sx={{display: 'flex', justifyContent:'space-between', flexDirection: 'column', marginBottom: '1rem'}}>
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography variant={'h2'} sx={{ margin: '1rem' }}>
            Profile
          </Typography>
          <Box>
            <Button color='info' onClick={() => setIsDisabled(!isDisabled)}>Edit</Button>
            <Button color='secondary' onClick={() => {
              if(initialUser.current) { setUser({type: 'loadUser', data: initialUser.current }) }
            }}>Reset</Button>
          </Box>
        </Box>
        <ProfileInput data={user.username} onBlur={touchField} onChange={updateForm} label={'Username'} disabled={isDisabled} required name='username' id='username'/>
        <ProfileInput data={user.email} onBlur={touchField} onChange={updateForm} label={'Email'} disabled={isDisabled} required id='email'/>
        <ProfileInput data={user.firstName} onBlur={touchField} onChange={updateForm} label={'First Name'} disabled={isDisabled} required id='firstName'/>
        <ProfileInput data={user.lastName} onBlur={touchField} onChange={updateForm} label={'Last Name'} disabled={isDisabled} required id='lastName'/>
        <ProfileInput data={user.address} onBlur={touchField} onChange={updateForm} label={'Street Address'} disabled={isDisabled} required id='address'/>
        <ProfileInput data={user.zipcode} onBlur={touchField} onChange={updateForm} label={'Zipcode'} disabled={isDisabled} required id='zipcode'/>
        <ProfileInput type='password' onBlur={touchField} data={user.currentPassword} onChange={updateForm} label={'Current Password'} disabled={isDisabled} id={'current-password'}/>
        <Button onClick={togglePasswordChange} color='warning'>
          { isPasswordDisabled ? 'Edit Password' : 'Cancel' }
        </Button>
        {!isPasswordDisabled && <>
          <ProfileInput type='password' onBlur={touchField} data={user.password} onChange={updateForm} label={'New Password'} disabled={isPasswordDisabled} id='password'/>
          <ProfileInput type='password' onBlur={touchField} data={user.confirmPassword} onChange={updateForm} label={'Confirm New Password'} disabled={isPasswordDisabled} id='confirmPassword'/>
        </>}
      </Paper>
      <Button type='submit' color='warning' sx={{ height: '100px'}} variant='outlined' fullWidth>
        Update Profile
      </Button>
    </Container>
  )
}

export default Profile
