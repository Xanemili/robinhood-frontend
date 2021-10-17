import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles({
  media: {
    height: 140,
  },
});

const CompanyNews = ({asset: {news}}) => {

  const classes = useStyles();

  if(!news){
    return null;
  }
  return (
    <>
      <h1>News</h1>
      <Divider />
      {news.map( story => (
        <Card key={story.url}>
          <CardActionArea onClick={() => window.open(`${story.url}`)}>
              <CardMedia
                className={classes.media}
                image={story.image}
                title={story.headline}
              />
            <h2>{story.headline}</h2>
            <CardContent>
              {story.summary}
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </>
  )
}

export default CompanyNews;
