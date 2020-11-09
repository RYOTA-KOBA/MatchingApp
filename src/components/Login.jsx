import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory, Redirect } from "react-router-dom"

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    setError("")
    setLoading(true)
    return login(emailRef.current.value, passwordRef.current.value)
    .then(() => {
      history.push("/")
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
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">ログイン</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>パスワード</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              ログインする
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">パスワードを忘れた場合はこちら</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        アカウントがない場合は? <Link to="/signup">サインアップ</Link>
      </div>
    </>
  )
}