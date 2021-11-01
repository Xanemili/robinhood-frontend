import { baseUrl } from '../config'

export async function getNews() {

  const token = localStorage.getItem('token')

  const res = await fetch(`${baseUrl}/news`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  const news = await res.json()
  return news;
}
