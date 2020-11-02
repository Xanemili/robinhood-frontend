import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


export default function News({article}) {
  const classes = useStyles();
  return (
    <Card className={classes.root} >
      <CardContent >
        <Typography className={classes.title} color='textPrimary' gutterBottom>
          {article.title}
        </Typography>
        <Typography variant='h2' component='h5' color='textSecondary' gutterBottom>
          {article.author} - {article.publishedAt}
        </Typography>
        <Typography variant='body2' component='p'>
        {article.description}
        </Typography>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
  );
}
