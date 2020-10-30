import React, {useEffect, useState} from 'react';
import News from './News'
import {getNews} from '../../fetches/news';

const NewsContainer = () => {

  const [news, setNews] = useState({articles: []});

  useEffect(() => {
    (async () => {
      const newNews = await getNews();
      setNews(newNews);
    })();
  }, [setNews]);

  return (
    <>
      {news.articles.map( article => {
        return <News article={article}/>
      })}
    </>
  )
}

export default NewsContainer;
