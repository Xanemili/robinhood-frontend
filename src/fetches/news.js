export async function getNews() {
  const res = await fetch('https://robin-trades.herokuapp.com/api/assets/news/news')
  const news = await res.json()
  return news;
}
