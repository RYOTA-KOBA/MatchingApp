import React, { useRef, useState, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

// materialUI
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(15),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontWeight: "bold",
    "&:focus": {
      outline: "none",
    },
  },
  guestLogin: {
    fontWeight: "bold",
    backgroundColor: "#b5b5b5",
    margin: "30px auto",
    display: "flex",
    "&:hover": {
      backgroundColor: "#8e8e8e",
    },
    "&:focus": {
      outline: "none",
    },
  },
}));

export default function Signup() {
  const classes = useStyles();
  const { signup, login }: any = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const inputName = useCallback(
    (event) => {
      setName(event.target.value);
    },
    [setName]
  );
  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  const inputPassword = useCallback(
    (event) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );
  const inputPasswordConfirm = useCallback(
    (event) => {
      setPasswordConfirm(event.target.value);
    },
    [setPasswordConfirm]
  );

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (password !== passwordConfirm) {
      return setError("パスワードが一致しません");
    }

    try {
      setError("");
      setLoading(true);
      await signup(name, email, password);
      history.push("/");
    } catch {
      setError("アカウントの作成に失敗しました");
    }

    setLoading(false);
  }

  const onClickGuestButton = () => {
    setError("");
    setLoading(true);
    return login("guest@example.com", "password")
      .then(() => {
        history.push("/");
      })
      .catch((error: any) => {
        setError("failed!!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ログイン
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="名前"
              value={name}
              onChange={inputName}
              disabled={loading}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              value={email}
              onChange={inputEmail}
              disabled={loading}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={inputPassword}
              disabled={loading}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Passwordの確認"
              type="password"
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={inputPasswordConfirm}
              disabled={loading}
            />
            <Button
              type="submit"
              id="submit-login"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={loading}
            >
              登録する
            </Button>
            <Grid container>
              <Grid item>
                既にアカウントをお持ちの場合は
                <Link to="/login">{"ログイン"}</Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      <Button
        className={classes.guestLogin}
        onClick={onClickGuestButton}
        disabled={loading}
      >
        ゲストユーザーとしてログイン
      </Button>
    </>
  );
}
