import React, { useRef, useState, useEffect } from "react";
// @ts-expect-error ts-migrate(6142) FIXME: Module '../contexts/AuthContext' was resolved to '... Remove this comment to see the full error message
import { useAuth } from "../contexts/AuthContext";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Link, useHistory } from "react-router-dom";
// @ts-expect-error ts-migrate(6142) FIXME: Module '../firebase' was resolved to '/Users/ryota... Remove this comment to see the full error message
import { db } from "../firebase";

// materialUI
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
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

export default function PostEdit() {
  const classes = useStyles();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPost, setCurrentPost] = useState([]);
  const history = useHistory();
  const titleRef = useRef();
  const contentRef = useRef();
  const path = window.location.href;
  const post_id = path.split("/postedit/")[1];
  const { editPost } = useAuth();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    if (titleRef.current.value.length > 42) {
      return setError("タイトルは42文字以内で入力してください");
    }
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    if (titleRef.current.value === "") {
      return setError("タイトルは入力必須項目です");
    }
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    if (contentRef.current.value === "") {
      return setError("必須の入力項目が空です。");
    }

    const id = post_id;
    await db
      .collection("posts")
      .doc(id)
      .get()
      .then((snapshot: any) => {
        const data = snapshot.data();
        setLoading(true);
        setError("");
        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        return editPost(titleRef.current.value, contentRef.current.value, data);
      })
      .catch((error: any) => {
        console.log(error);
        setError("failed!!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getPost = async () => {
    let post: any = [];
    await db
      .collection("posts")
      .doc(post_id)
      .get()
      .then((doc: any) => {
        const data = doc.data();
        post.push({
          title: data.title,
          content: data.content,
          id: post_id,
        });
      });
    setCurrentPost(post);
  };

  useEffect(() => {
    getPost();
  }, [getPost]);

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
      {currentPost.map((post) => (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Card className={classes.card} key={post_id}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          {error && <Alert severity="error">{error}</Alert>}
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <CardContent>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <h2 className={classes.header}>投稿を編集</h2>
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
                  inputRef={titleRef}
                  className={classes.postFormTextField}
                  required
                  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type 'never'.
                  defaultValue={post.title}
                />
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <br />
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <TextField
                  type="text"
                  label="内容"
                  inputRef={contentRef}
                  className={classes.postFormTextField}
                  multiline={true}
                  rows={4}
                  required
                  // @ts-expect-error ts-migrate(2339) FIXME: Property 'content' does not exist on type 'never'.
                  defaultValue={post.content}
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
      ))}
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Link to="/" className={classes.cancel}>
        キャンセル
      </Link>
    </>
  );
}
