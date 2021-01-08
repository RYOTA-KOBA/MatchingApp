import React, { useRef, useState, useEffect } from "react";
// import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { db } from "../firebase";
import ImageArea from "./ImageArea";

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
    margin: "130px auto auto auto",
    borderRadius: "12px",
  },
  postFormTextField: {
    width: "100%",
    marginBottom: "15px",
  },
  logoutBtn: {
    fontWeight: "bold",
  },
}));

export default function UpdateProfile() {
  const usernameRef: any = useRef();
  const emailRef: any = useRef();
  const introRef: any = useRef();
  const passwordRef: any = useRef();
  const passwordConfirmRef: any = useRef();
  const {
    updateUser,
    currentUser,
    updatePassword,
    logout,
    defUsername,
    defIntro,
  }: any = useAuth();
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (introRef.current.value.length > 160) {
      return setError("自己紹介文は160字以内で入力してください");
    }
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("パスワードが一致しません");
    }
    if (passwordRef.current.value !== "") {
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
          usernameRef.current.value,
          emailRef.current.value,
          introRef.current.value,
          images,
          data
        );
      })
      .then(() => {
        // Success
        history.push("/");
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
    <>
      <Card className="profile-edit" variant="outlined">
        {error && <Alert severity="error">{error}</Alert>}
        <CardContent>
          <h2 className="text-center mb-4 update-profile-header">
            プロフィールの編集 ⚙️
          </h2>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <ImageArea
              images={images}
              setImages={setImages}
              uid={currentUser.uid}
            />
            <TextField
              className={classes.postFormTextField}
              type="text"
              inputRef={usernameRef}
              label="名前"
              required
              defaultValue={defUsername}
            />
            <br />
            <TextField
              className={classes.postFormTextField}
              type="email"
              inputRef={emailRef}
              label="Email"
              required
              defaultValue={currentUser.email}
            />
            <br />
            <TextField
              className={classes.postFormTextField}
              type="text"
              inputRef={introRef}
              label="自己紹介"
              multiline={true}
              defaultValue={defIntro}
            />
            <br />
            <TextField
              className={classes.postFormTextField}
              type="password"
              inputRef={passwordRef}
              label="パスワード"
              placeholder="空欄の場合は変更しません"
            />
            <br />
            <TextField
              className={classes.postFormTextField}
              type="password"
              inputRef={passwordConfirmRef}
              label="パスワード(再入力)"
              placeholder="空欄の場合は変更しません"
            />
            <br />
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
      <div className="w-100 text-center mt-3">
        <Link to="/">キャンセル</Link>
      </div>
      <div className="w-100 text-center mt-3">
        <Button
          className={classes.logoutBtn}
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
