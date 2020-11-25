import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'

//material ui
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: 15,
    maxHeight: "200px",
    position: "relative"
  },
  threeDots: {
    float: "right",
    "&:focus": {
      outline: "none"
    }
  },
  editLink: {
    color: "#000000DE",
    "&:hover": {
      textDecoration: "none",
      color: "#000000DE"
    }
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
    fontSize: "14px",
    marginTop: "8px",
  },
  contentText: {
    overflow: "hidden",
    lineHeight: "1.5",
    maxHeight: "3em",
    marginTop: "8px"
  },
  detailBtnWrap: {
    float: "left"
  },
  detailLink: {
    "&:hover": {
      textDecoration: "none"
    }
  },
  detailButton: {
    backgroundColor: "#d2d6db",
    color: "#363d44",
    "&:focus": {
      outline: "none"
    }
  },
  likeBtn: {
    float: "right",
    marginRight: "16px",
    "&:focus": {
      outline: "none"
    }
  },
});

export default function BookmarkListItem({ authorName, content, createdAt, title, post_id, id}) {
    const classes = useStyles();
    const history = useHistory()
    const { currentUser } = useAuth()
    const uid = currentUser.uid

    const removePostFromBookmark = async () => {
        await db.collection('users').doc(uid)
            .collection('bookmarks').doc(id)
            .delete();
        history.push('/bookmarkList')
    };

    return (
        <>
        <Card className={classes.root} variant="outlined">
            <CardContent style={{ paddingBottom: "0" }}>
                <Typography variant="h5" component="h3">
                  {title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {authorName+"・"+createdAt}
                </Typography>
                <Typography className={classes.contentText} variant="body2" component="p">
                  {content}
                </Typography>
            </CardContent>
            <CardActions className={classes.detailBtnWrap}>
              <Link to={'/detail/' + post_id} className={classes.detailLink}>
                <Button variant="contained" className={classes.detailButton} size="small">詳細を表示</Button>
              </Link>
            </CardActions>
            <IconButton className={classes.likeBtn} onClick={() => removePostFromBookmark(id)}>
               <HighlightOffIcon />
            </IconButton>
        </Card>
        </>
    )
}
