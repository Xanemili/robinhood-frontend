import { baseUrl } from '../config'

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
