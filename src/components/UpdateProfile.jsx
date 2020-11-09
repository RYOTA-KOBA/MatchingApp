import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory, Redirect, Route } from "react-router-dom"
import { db } from "../firebase"
import Dashboard from "../components/Dashboard"

//material ui
// import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
// import Button from "@material-ui/core/Button";
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),
//       width: '95%',
//     },
//   },
// }));

export default function UpdateProfile() {
  const usernameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { updateUser, currentUser, updatePassword } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  // const classes = useStyles();

  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("パスワードが一致しません")
    }

    if (passwordRef.current.value) {
      updatePassword(passwordRef.current.value)
    }

    const uid = currentUser.uid
    db.collection('users').doc(uid).get()
    .then(snapshot => {
      const data = snapshot.data() 
      try {
        setLoading(true)
        setError("")
        updateUser(usernameRef.current.value, emailRef.current.value, data)
        .then(() => {
          history.push('/dashboard')
        })
      } catch {
        setError("アカウント情報の編集に失敗しました")
      }
      setLoading(false)
    })
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">プロフィールの編集</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="username">
              <Form.Label>名前</Form.Label>
              <Form.Control
                type="text"
                ref={usernameRef}
                required
                defaultValue={currentUser.username}
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>パスワード</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="空欄の場合は変更しません"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>パスワードの編集</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="空欄の場合は変更しません"
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              編集を完了する
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">キャンセル</Link>
      </div>
    </>
  )
}
