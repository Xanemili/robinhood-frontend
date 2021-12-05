import { Grid } from '@mui/material'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { useEffect, useState } from 'react'
import { loadUser } from '../../fetches/user'

interface ProfileProps {

}

type UserProfile = {
    email: string
    address: string
    zipcode: string
}

const Profile = (props: ProfileProps) => {

  const [email, setEmail] = useState('')

  useEffect(() => {
    (async () => {
      const userData = await loadUser()
      const { emailData } = userData
      setEmail(emailData)
    })()
  }, [])

  return (
    <Container>
      <Grid container>
        <Grid item xs={8}>
          {email}
        </Grid>

        <Grid item xs={4}>

        </Grid>
      </Grid>
    </Container>
  )
}

export default Profile
