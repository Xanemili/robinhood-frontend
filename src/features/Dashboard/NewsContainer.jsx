import React, {useEffect, useState} from 'react';
import News from './News'
import {getNews} from '../../fetches/news';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

const NewsContainer = () => {

  const [news, setNews] = useState({articles: []});

  useEffect(() => {
    (async () => {
      // const newNews = await getNews();
      // setNews(newNews);
    })();
  }, [setNews]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h2'>
          Market News
        </Typography>
      </Grid>
      {news.articles.map( (article,idx) => {
        return (
            <Grid item key={idx} xs={6}>
              {/* <News article={article} /> */}
            </Grid>
        )
      })}
    </Grid>
  )
}

export default NewsContainer;
