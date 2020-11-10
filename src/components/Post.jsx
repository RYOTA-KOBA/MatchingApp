import React from 'react'
//material ui
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: 15
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

const Post = ({ authorName, content, createdAt, title, authorId}) => {
  const classes = useStyles();

    // const handleClick = () => {
    //     history.push('/detail')
    // }

    return (
        <>
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography variant="h5" component="h3">
                    {title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {authorName}
                </Typography>
                <Typography variant="body2" component="p">
                    {content}
                </Typography>
            </CardContent>
            <CardActions>
                {/* onClick={handleClick}で詳細ページへ遷移 */}
                <Button size="small">詳細を表示</Button>
            </CardActions>
        </Card>
        </>
    )
}
export default Post