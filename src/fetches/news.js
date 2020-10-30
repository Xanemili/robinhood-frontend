export async function getNews() {
  const res = await fetch('https://newsapi.org/v2/top-headlines?apiKey=53eeb325d1d34dd19167158c3aa45798&language=en&category=business&country=us')
  const news = await res.json()
  return news;
}
