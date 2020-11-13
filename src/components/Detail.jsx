import React, { useState, useEffect, useCallback} from 'react'
import { useAuth } from "../contexts/AuthContext"
import { Link } from 'react-router-dom'

//materialUI
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { db } from '../firebase'
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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

export default function Detail() {
    const classes = useStyles();
    const path = window.location.href;
    const id = path.split('/detail/')[1];

    const [postDetail, setPostDetail] = useState([])

    useEffect(() => {
        getPost();
    }, [])

    const getPost = async() => {
        let post = []
        await db.collection('posts').doc(id).get()
        .then(doc => {
            const data = doc.data()
            console.log(data)

            const date = new Date(data.createdAt.seconds*1000);
            const Day = date.toLocaleDateString("ja-JP")
            const Time = date.toLocaleTimeString("ja-JP")

            post.push({
                authorName: data.authorName,
                content: data.content,
                createdAt: data.createdAt,
                title: data.title,
                createdAt: Day + " " + Time,
                id: doc.id
            })
        })
        setPostDetail(post)
    }
    
    
    return (
        <>
            <Link to="/" className={classes.backLink}>
                <Button className={classes.backButton}>
                    一覧に戻る
                </Button>
            </Link>
            {postDetail.map(post => 
            <Card className={classes.root} key={post.id}>
                <CardContent>
                    <IconButton className={classes.threeDots}>
                        <MoreVertIcon />
                    </IconButton>
                    
                    <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                    >
                        {post.title}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {post.authorName}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {post.content}
                    </Typography>
                    <Typography className={classes.time} color="textSecondary">
                        {post.createdAt}
                    </Typography>
                </CardContent>
            </Card>   
            )}         
        </>
    )
}
