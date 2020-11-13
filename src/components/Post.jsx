import React from 'react'
import { Link } from 'react-router-dom'
import Detail from './Detail'

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
  detailLink: {
    "&:hover": {
      textDecoration: "none"
    }
  },
  detailButton: {
    backgroundColor: "#d2d6db",
    color: "#363d44",
  }
});

const Post = ({ authorName, content, createdAt, title, id}) => {
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
              <Link to={'/detail/' + id} className={classes.detailLink}>
                <Button variant="contained" className={classes.detailButton} size="small">詳細を表示</Button>
              </Link>
            </CardActions>
        </Card>
        </>
    )
}
export default Post