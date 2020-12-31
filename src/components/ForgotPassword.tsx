import React, { useCallback, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

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

export default function ForgotPassword() {
  const classes = useStyles();
  const { resetPassword }: any = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  async function handleSubmit(e: any) {
    e.preventDefault();

    const reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;

    if (email === "") {
      return setError("メールアドレスを入力してください");
    }
    if (reg.test(email) === false) {
      return setError("正しいメールアドレスを入力してください");
    }

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(email);
      setMessage("メールをご確認ください");
    } catch {
      setError("パスワードのリセットに失敗しました");
    }

    setLoading(false);
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          {error && <Alert severity="error">{error}</Alert>}
          {message && <Alert severity="success">{message}</Alert>}
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            パスワードのリセット
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
              helperText="入力いただいたアドレス宛にパスワードの再発行メールをお送りいたします。"
            />
            <Button
              type="submit"
              id="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={loading}
            >
              送信
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/login">ログインはこちら</Link>
              </Grid>
              <Grid item>
                <Link to="/signup">サインアップ</Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
}
