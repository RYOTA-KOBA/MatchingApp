import React, { useRef, useState, useCallback } from "react"
// import { Form, Button, Card, Alert } from "react-bootstrap"
// @ts-expect-error ts-migrate(6142) FIXME: Module '../contexts/AuthContext' was resolved to '... Remove this comment to see the full error message
import { useAuth } from "../contexts/AuthContext"
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import {  Link, useHistory } from "react-router-dom"

// materialUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(15),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontWeight: "bold",
    "&:focus": {
      outline: "none"
    }
  },
  guestLogin: {
    fontWeight: "bold",
    backgroundColor: "#b5b5b5",
    margin: "30px auto",
    display: 'flex',
    "&:hover": {
      backgroundColor: "#8e8e8e"
    },
    "&:focus": {
      outline: "none"
    }
  }
}));

export default function Login() {
  const classes = useStyles();
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const history = useHistory()

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  }, [setEmail]);
  
  const inputPassword = useCallback((event) => {
    setPassword(event.target.value)
  }, [setPassword]);

  async function handleSubmit(e: any) {
    e.preventDefault()
    
    setError("")
    setLoading(true)
    return login(email, password)
    .then(() => {
      history.push("/")
    })
    .catch((error: any) => {
      setError("failed!!")
    })
    .finally(() => {
        setLoading(false)
    });
  }

  const onClickGuestButton = () => {
    setError("")
    setLoading(true)
    return login("guest@example.com", "password")
    .then(() => {
      history.push("/")
    })
    .catch((error: any) => {
      setError("failed!!")
    })
    .finally(() => {
        setLoading(false)
    });
  }

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    {error && <Alert className={classes.alert} severity="error">{error}</Alert>}
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <Container component="main" maxWidth="xs">
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div className={classes.paper}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Avatar className={classes.avatar}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <LockOutlinedIcon />
        </Avatar>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Typography component="h1" variant="h5">
          ログイン
        </Typography>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            value={email}
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'MutableRefObject<undefined>' is not assignab... Remove this comment to see the full error message
            ref={emailRef}
            onChange={inputEmail}
          />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            value={password}
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'MutableRefObject<undefined>' is not assignab... Remove this comment to see the full error message
            ref={passwordRef}
            onChange={inputPassword}
          />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <FormControlLabel
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            ログインする
          </Button>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Grid container>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Grid item xs>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Link to="/forgot-password" variant="body2">
                パスワードを忘れた場合はこちら
              </Link>
            </Grid>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Grid item>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Link to="/signup" variant="body2">
                {"サインアップ"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <Button className={classes.guestLogin} onClick={onClickGuestButton}>
      ゲストユーザーとしてログイン
    </Button>
    </>
  )
}