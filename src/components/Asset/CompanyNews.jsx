import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import makeStyles from '@material-ui/core/styles/makeStyles'

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
