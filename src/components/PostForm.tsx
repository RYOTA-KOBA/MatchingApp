import React, { useRef, useState, useCallback } from "react";
// @ts-expect-error ts-migrate(6142) FIXME: Module '../contexts/AuthContext' was resolved to '... Remove this comment to see the full error message
import { useAuth } from "../contexts/AuthContext";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Link } from "react-router-dom";
// @ts-expect-error ts-migrate(6142) FIXME: Module '../firebase' was resolved to '/Users/ryota... Remove this comment to see the full error message
import { db } from "../firebase";
// @ts-expect-error ts-migrate(6142) FIXME: Module '../firebase' was resolved to '/Users/ryota... Remove this comment to see the full error message
import firebase from "../firebase";

// materialUI
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  alert: {
    marginBottom: "15px",
  },
  card: {
    width: "600px",
    padding: "30px",
    marginTop: "130px",
  },
  root: {
    margin: "0 auto",
    width: "500px",
    display: "flex",
    justifyContent: "center",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
  },
  postFormBox: {
    width: "90%",
  },
  postFormTextField: {
    width: "100%",
    marginBottom: "15px",
  },
  cancel: {
    textAlign: "center",
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
  },
}));

export default function PostForm() {
  const classes = useStyles();
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const titleRef = useRef();
  const contentRef = useRef();
  const { createPost, currentUser } = useAuth();

  const inputTitle = useCallback(
    (event) => {
      setTitle(event.target.value);
    },
    [setTitle]
  );

  const inputContent = useCallback(
    (event) => {
      setContent(event.target.value);
    },
    [setContent]
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (title.length > 42) {
      return setError("タイトルは42文字以内で入力してください");
    }
    if (title === "") {
      return setError("タイトルは入力必須項目です");
    }
    if (content === "") {
      return setError("入力内容が正しくありません");
    }

    setError("");
    setLoading(true);
    setTitle("");
    setContent("");

    try {
      const uid = currentUser.uid;
      await db
        .collection("users")
        .doc(uid)
        .get()
        .then((snapshot: any) => {
          const data = snapshot.data();
          const authorName = data.username;
          return createPost(title, content, authorName, uid);
        });
    } catch {
      setError("投稿に失敗しました");
      setLoading(false);
    }
  };

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
          <h2 className={classes.header}>新規投稿を作成</h2>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className={classes.postFormBox}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <TextField
                type="text"
                label="タイトル"
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'MutableRefObject<undefined>' is not assignab... Remove this comment to see the full error message
                ref={titleRef}
                className={classes.postFormTextField}
                required
                value={title}
                onChange={inputTitle}
              />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <br />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <TextField
                type="text"
                label="内容"
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'MutableRefObject<undefined>' is not assignab... Remove this comment to see the full error message
                ref={contentRef}
                className={classes.postFormTextField}
                multiline={true}
                rows={4}
                required
                value={content}
                onChange={inputContent}
              />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <br />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Link to="/" className={classes.cancel}>
        キャンセル
      </Link>
    </>
  );
}
