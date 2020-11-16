import React, { useRef, useState, useCallback } from 'react'
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
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const titleRef = useRef()
    const contentRef = useRef()
    const { editPost, currentId, currentPost } = useAuth()

        const inputTitle = useCallback((event) => {
      setTitle(event.target.value)
    }, [setTitle]);
    
    const inputContent = useCallback((event) => {
      setContent(event.target.value)
    }, [setContent]);

    const handleSubmit = async(e) => {
      e.preventDefault();

        if (title === "") {
        return setError("必須の入力項目が空です。")
        }
        if (content === "") {
        return setError("必須の入力項目が空です。")
        }

        

        db.collection('posts').doc(currentId).get()
        .then(snapshot => {
          const data = snapshot.data()
          setLoading(true)
          setError("")
          return editPost(title, content, data);
        })
        .then(() => {
            // Success
            history.push('/')
        })
        .catch((error) => {
            setError("failed!!")
        })
        .finally(() => {
            setLoading(false)
        });
    }

    return (
        <>
        {console.log(currentPost)}
          {error && <Alert className={classes.alert} severity="error">{error}</Alert>}
          <Card className={classes.card}>
            <CardContent>
              <h2 className={classes.header}>投稿を編集</h2>
              <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                  <div className={classes.postFormBox}>
                    <TextField 
                      type="text" 
                      label="タイトル" 
                      ref={titleRef} 
                      className={classes.postFormTextField} 
                      multiline={true}
                      required
                      value={title}
                      onChange={inputTitle}
                      defaultValue={currentPost.title}
                    />
                    <br/>
                    <TextField 
                      type="text" 
                      label="内容" 
                      ref={contentRef} 
                      className={classes.postFormTextField} 
                      multiline={true}
                      rows={4} 
                      required 
                      value={content}
                      onChange={inputContent}
                      defaultValue={currentPost.content}
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
          <Link to="/" className={classes.cancel}>
            キャンセル
          </Link>   
        </>
    )
}
