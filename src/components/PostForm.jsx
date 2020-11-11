import React, { useRef, useState, useCallback } from 'react'
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { Alert } from "react-bootstrap"

// materialUI
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    width: '500px',
  },
  header: {
    textAlign: "center",
    marginBottom: "30px"
  },
  postFormBox: {
    margin: "0 auto",
    width: '500px',
  },
  postFormTextField: {
    width: '500px',
    marginBottom: "15px"
  }
}));

export default function PostForm() {
    const classes = useStyles();
    const [error, setError] = useState("")
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const titleRef = useRef()
    const contentRef = useRef()
    const { createPost, currentUser } = useAuth()

    const inputTitle = useCallback((event) => {
      setTitle(event.target.value)
    }, [setTitle]);
    
    const inputContent = useCallback((event) => {
      setContent(event.target.value)
    }, [setContent]);

    const handleSubmit = async(e) => {
      e.preventDefault();

      
      setError("")
      setLoading(true)
      setTitle("")
      setContent("")
      console.log(title)
      console.log(content)
      const authorName = currentUser.username
      createPost(title, content, authorName)
      history.push("/")
      setError("投稿に失敗しました")
      setLoading(false)
    }
    
    return (
        <>
          {error && <Alert variant="danger">{error}</Alert>}
          <h2 className={classes.header}>新規投稿を行う</h2>
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
                />
                <br/>
                <Button 
                  variant="contained" 
                  type="submit" 
                  color="primary" 
                  style={{ width: "100%" }}
                  disabled={loading}
                >
                  投稿
                </Button>
              </div>
          </form>            
        </>
    )
}
