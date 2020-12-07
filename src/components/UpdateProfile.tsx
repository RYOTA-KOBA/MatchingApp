import React, { useRef, useState } from "react";
// import { Form, Button, Card, Alert } from "react-bootstrap";
// @ts-expect-error ts-migrate(6142) FIXME: Module '../contexts/AuthContext' was resolved to '... Remove this comment to see the full error message
import { useAuth } from "../contexts/AuthContext";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Link, useHistory } from "react-router-dom";
// @ts-expect-error ts-migrate(6142) FIXME: Module '../firebase' was resolved to '/Users/ryota... Remove this comment to see the full error message
import { db } from "../firebase";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    width: "500px",
    display: "flex",
    justifyContent: "center",
  },
  card: {
    width: "600px",
    padding: "30px",
    paddingBottom: "0",
    marginTop: "130px",
  },
  postFormTextField: {
    width: "100%",
    marginBottom: "15px",
  },
}));

export default function UpdateProfile({
  userName
}: any) {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const {
    updateUser,
    currentUser,
    updatePassword,
    logout,
    defUsername,
  } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("パスワードが一致しません");
    }

    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    if (passwordRef.current.value !== "") {
      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      updatePassword(passwordRef.current.value);
    }

    const uid = currentUser.uid;
    await db
      .collection("users")
      .doc(uid)
      .get()
      .then((snapshot: any) => {
        const data = snapshot.data();
        setLoading(true);
        setError("");
        return updateUser(
          // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
          usernameRef.current.value,
          // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
          emailRef.current.value,
          data
        );
      })
      .then(() => {
        // Success
        history.push("/dashboard");
      })
      .catch((error: any) => {
        setError("編集に失敗しました!!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Card className={classes.card}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        {error && <Alert severity="error">{error}</Alert>}
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <CardContent>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <h2 className="text-center mb-4 update-profile-header">
            プロフィールの編集 ⚙️
          </h2>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <TextField
              className={classes.postFormTextField}
              type="text"
              inputRef={usernameRef}
              label="名前"
              required
              defaultValue={defUsername}
            />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <br />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <TextField
              className={classes.postFormTextField}
              type="email"
              inputRef={emailRef}
              label="Email"
              required
              defaultValue={currentUser.email}
            />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <br />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <TextField
              className={classes.postFormTextField}
              type="password"
              inputRef={passwordRef}
              label="パスワード"
              placeholder="空欄の場合は変更しません"
            />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <br />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <TextField
              className={classes.postFormTextField}
              type="password"
              inputRef={passwordConfirmRef}
              label="パスワードの編集"
              placeholder="空欄の場合は変更しません"
            />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <br />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Button
              disabled={loading}
              color="primary"
              variant="contained"
              className="w-100"
              type="submit"
            >
              編集を完了する
            </Button>
          </form>
        </CardContent>
      </Card>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div className="w-100 text-center mt-2">
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Link to="/">キャンセル</Link>
      </div>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div className="w-100 text-center mt-2">
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={handleLogout}
        >
          ログアウト
        </Button>
      </div>
    </>
  );
}
