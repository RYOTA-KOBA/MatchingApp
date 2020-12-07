import React, { useState, useEffect } from 'react'
// @ts-expect-error ts-migrate(6142) FIXME: Module '../contexts/AuthContext' was resolved to '... Remove this comment to see the full error message
import { useAuth } from "../contexts/AuthContext"
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Link } from 'react-router-dom'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { useHistory } from 'react-router-dom'
// @ts-expect-error ts-migrate(6142) FIXME: Module '../firebase' was resolved to '/Users/ryota... Remove this comment to see the full error message
import { db } from '../firebase'

//materialUI
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles({
    backLink: {
        "&:hover": {
            textDecoration: "none"
        }
    },
    backButton: {
        "&:focus": {
            outline: "none"
        }
    },
    root: {
        width: "100%",
        marginTop: "15px"
    },
    threeDots: {
        float: "right",
        "&:focus": {
            outline: "none"
        }
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)"
    },
    editLink: {
        color: "#000000DE",
        "&:hover": {
            textDecoration: "none",
            color: "#000000DE"
        }
    },
    title: {
        fontSize: 20,
        color: "#000",
        marginTop: "8px"
    },
    pos: {
        marginBottom: 12
    },
    time: {
        fontSize: "14px",
        marginTop: "15px",
        marginRight: "8px",
        textAlign: "right"
    }
});

//パフォーマンステスト用
// if (process.env.NODE_ENV !== 'production') {
//     const {whyDidYouUpdate} = require('why-did-you-update');
//     whyDidYouUpdate(React);
// }

export default function Detail() {
    const classes = useStyles();
    const path = window.location.href;
    const history = useHistory()
    const id = path.split('/detail/')[1];
    const [postDetail, setPostDetail] = useState([])
    const { setNowId, setNowPost, currentUser } = useAuth()

    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
  
    const handleClick = (event: any) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const deletePost = () => {
        db.collection('posts').doc(id).delete()
        .then(() => {
            console.log('削除成功！！')
            history.push('/')
        })
        .catch(() => console.log('削除失敗!!'))
    }

    const getPost = async() => {
        let post: any = []
        await db.collection('posts').doc(id).get()
        .then((doc: any) => {
            const data = doc.data()
            
            const date = new Date(data.createdAt.seconds*1000);
            const Day = date.toLocaleDateString("ja-JP")
            const Time = date.toLocaleTimeString("ja-JP")
            
            post.push({
                authorName: data.authorName,
                content: data.content,
                title: data.title,
                createdAt: Day + " " + Time,
                uid: data.uid,
                id: doc.id
            })
        })
        setPostDetail(post)
    }

    const setId = () => {
        setNowId(id)
        // console.log(id)
    }

    const setPost = () => {
        setNowPost(id)
    }

    useEffect(() => {
        getPost();
    }, [getPost])
    
    return (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div style={{ marginTop: "100px" }}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Link to="/" className={classes.backLink}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Button className={classes.backButton}>
                    トップに戻る
                </Button>
            </Link>
            {postDetail.map(post => 
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Card className={classes.root} key={post.id}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <CardContent>
                    {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'uid' does not exist on type 'never'. */}
                    {post.uid === currentUser.uid && (
                    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <IconButton className={classes.threeDots} onClick={handleClick}>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <MoreVertIcon />
                    </IconButton>
                    )}
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                        style: {
                            width: '150px',
                        },
                        }}
                    >
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <MenuItem
                            onClick={() => {
                                setId()
                                setPost()
                                handleClose()
                            }}
                        >
                            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <Link to={'/postedit/' + id} className={classes.editLink}>
                                編集する
                            </Link>
                        </MenuItem>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <MenuItem 
                            onClick={() => {
                                // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
                                deletePost(id)
                                handleClose()
                            }}
                        >
                            削除する
                        </MenuItem>
                    </Menu>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                    >
                        {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type 'never'. */}
                        {post.title}
                    </Typography>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Typography className={classes.pos} color="textSecondary">
                        {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'authorName' does not exist on type 'neve... Remove this comment to see the full error message */}
                        {post.authorName}
                    </Typography>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Typography variant="body2" component="p">
                        {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'content' does not exist on type 'never'. */}
                        {post.content}
                    </Typography>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Typography className={classes.time} color="textSecondary">
                        {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'createdAt' does not exist on type 'never... Remove this comment to see the full error message */}
                        {post.createdAt}
                    </Typography>
                </CardContent>
            </Card>   
            )}  
            </div>       
        </>
    )
}
