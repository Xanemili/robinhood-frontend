export interface IexAsset {
  symbol: string
  latestPrice?: number
  id?: number
}

export interface NewsApiArticle {
  author: string,
  title: string,
  description: string,
  url: URL,
  urlToImage: string,
  publishedAt: string,
  content: string
}
