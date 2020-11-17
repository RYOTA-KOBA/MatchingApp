import React, { useRef, useState, useEffect } from 'react'
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { db } from '../firebase'

// materialUI
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
  alert: {
    marginBottom: "15px"
  },
  card: {
    width: "600px",
    padding: "30px"
  },
  root: {
    margin: "0 auto",
    width: '500px',
    display: "flex",
    justifyContent: "center"
  },
  header: {
    textAlign: "center",
    marginBottom: "30px"
  },
  postFormBox: {
    width: '90%',
  },
  postFormTextField: {
    width: '100%',
    marginBottom: "15px"
  },
  cancel: {
    textAlign: "center",
    marginTop: "30px",
    display: "flex",
    justifyContent: "center"
  }
}));

export default function PostEdit() {
    const classes = useStyles();
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [currentPost, setCurrentPost] = useState([])
    const history = useHistory()
    const titleRef = useRef()
    const contentRef = useRef()
    const path = window.location.href;
    const post_id = path.split('/postedit/')[1];
    const { editPost } = useAuth()

    const handleSubmit = async(e) => {
      e.preventDefault();

        if (titleRef.current.value === "") {
        return setError("必須の入力項目が空です。")
        }
        if (contentRef.current.value === "") {
        return setError("必須の入力項目が空です。")
        }

        const id = post_id
        await db.collection('posts').doc(id).get()
        .then(snapshot => {
            const data = snapshot.data()
            setLoading(true)
            setError("")
            return editPost(titleRef.current.value, contentRef.current.value, data)
        })
        .then(() => {
            // Success
            history.push('/')
        })
        .catch((error) => {
            console.log(error)
            setError("failed!!")
        })
        .finally(() => {
            setLoading(false)
        });
    }

    const getPost = async() => {
        let post = [];
        await db.collection('posts').doc(post_id).get()
        .then(doc => {
            const data = doc.data();
            post.push({
                title: data.title,
                content: data.content,
                id: post_id
            })
        })
        setCurrentPost(post)
    }

    useEffect(() => {
        getPost()
    }, [])

    return (
        <>
            
          {error && <Alert className={classes.alert} severity="error">{error}</Alert>}
          {currentPost.map(post =>
          <Card className={classes.card} key={post_id}>
            <CardContent>
              <h2 className={classes.header}>投稿を編集</h2>
              <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                  <div className={classes.postFormBox}>
                    <TextField 
                      type="text" 
                      label="タイトル" 
                      inputRef={titleRef} 
                      className={classes.postFormTextField} 
                      required
                      defaultValue={post.title}
                    />
                    <br/>
                    <TextField 
                      type="text" 
                      label="内容" 
                      inputRef={contentRef} 
                      className={classes.postFormTextField} 
                      multiline={true}
                      rows={4} 
                      required 
                      defaultValue={post.content}
                    />
                    <br/>
                    <Button 
                      variant="contained" 
                      type="submit" 
                      color="primary" 
                      style={{ width: "100%", marginTop: "15px" }}
                      disabled={loading}
                    >
                      投稿
                    </Button>
                  </div>
              </form>  
              
            </CardContent>
          </Card> 
          )} 
          <Link to="/" className={classes.cancel}>
            キャンセル
          </Link>   
        </>
    )
}
