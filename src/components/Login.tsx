import React, { useState, useCallback } from "react";
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

export default function Login() {
  const classes = useStyles();
  const { login }: any = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

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

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setError("");
    setLoading(true);
    return login(email, password)
      .then(() => {
        history.push("/");
      })
      .catch((error: any) => {
        setError("ログインに失敗しました");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onClickGuestButton = () => {
    setError("");
    setLoading(true);
    return login("guest@example.com", "password")
      .then(() => {
        history.push("/");
      })
      .catch((error: any) => {
        setError("ログインに失敗しました");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          {error && <Alert severity="error">{error}</Alert>}
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
            <Button
              type="submit"
              id="submit-login"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={loading}
            >
              ログインする
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/forgot-password">
                  パスワードを忘れた場合はこちら
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup">{"サインアップ"}</Link>
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
