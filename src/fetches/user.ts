import { baseUrl } from '../config'
import { createAlert } from '../store/alertSlice'
import store from '../store/store'

export const loadUser = async () => {
  const token = localStorage.getItem('token')

  const res = await fetch(`${baseUrl}/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (res.ok) {
    const data = await res.json()
    return data
  } else {
    return {}
  }
}

export const updateProfile = async (data: any) => {
  const token = localStorage.getItem('token')
  console.log(data)

  const res = await fetch(`${baseUrl}/users/profile`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (res.ok) {
    const data = await res.json()
    store.dispatch(createAlert({message: 'Profile Updated'}))
    return data
  }
}
