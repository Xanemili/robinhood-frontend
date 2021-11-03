import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia'
import { Typography } from '@mui/material';
import { NewsApiArticle } from '../../api-types'

interface NewsApiArticleProps {
  article: NewsApiArticle
}

export default function News(props: NewsApiArticleProps) {

  const { article } = props

  const parseDate = (dateString: string) => {
    const newDate = new Date()
    newDate.setTime(Date.parse(dateString))
    return `${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear()}`
  }

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height='180'
          image={article.urlToImage}
        />
        <CardContent>
          <Typography color='textPrimary' gutterBottom>
            {article.title}
          </Typography>
          <Typography variant='h2' component='h5' color='textSecondary' gutterBottom>
            {article.author} - {parseDate(article.publishedAt)}
          </Typography>
          <Typography variant='body2' component='p'>
          {article.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      </CardActions>
    </Card>
  );
}
