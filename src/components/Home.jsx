import React, { useEffect, useState } from 'react'
// import { Card, Button } from 'react-bootstrap'
import { useAuth } from "../contexts/AuthContext"
import { Link } from 'react-router-dom'
import { auth, db } from "../firebase"
import Post from './Post'

//materialUI
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    root: {
        width: "100%",
        marginTop: "15px"
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)"
    },
    title: {
        fontSize: 20,
        color: "#000"
    },
    pos: {
        marginBottom: 12
    }
});

const Home = () => {
    const { currentUser, logout } = useAuth()
    const [currentPost, setCurrentPost] = useState([])
    const classes = useStyles();

    useEffect(() => {
        getPosts();
    }, [])

    const getPosts = async() => {
        let posts = []
        await db.collection('posts').orderBy('createdAt', 'desc').get()
        .then(snapshot => {
            snapshot.docs.forEach(doc => {
                const data = doc.data()
                posts.push({
                    authorName: data.authorName,
                    content: data.content,
                    createdAt: data.createdAt,
                    title: data.title,
                    authorId: data.authorId,
                    id: doc.id               
                })
            })
            
            setCurrentPost(posts)
        })
    }

    return (
        <>
            <h3>Posts</h3>
            {currentPost.map(post => 
                <Post 
                    key={post.id}
                    authorName={post.authorName}
                    content={post.content}
                    createdAt={post.createdAt}
                    title={post.title}
                />
            )}
        </>
    )
}
export default Home