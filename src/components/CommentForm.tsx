import React, { useCallback, useState, useEffect } from "react";
import { db, timestamp } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

//material ui
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CommentForm({ id }: any) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [content, setContent] = useState("");
  const { currentUser, createComment }: any = useAuth();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const inputContent = useCallback(
    (event) => {
      setContent(event.target.value);
    },
    [setContent]
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (content === "") {
      return setError("コメントを入力してください"), setOpen(true);
    }
    if (content.length > 200) {
      return setError("200文字以内で入力してください"), setOpen(true);
    }

    // db.collection("posts").doc(id).collection("comments").add;
    try {
      setError("");
      setLoading(true);
      const uid = currentUser.uid;
      return createComment(id, content, uid);
    } catch {
      setError("投稿に失敗しました");
      setOpen(true);
    }
    setLoading(false);
  };

  return (
    <>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <textarea
          className="comment-textarea"
          name="content"
          id="content"
          placeholder="コメントを残す"
          onChange={inputContent}
        ></textarea>
        <div className="comment-submit-wrapper">
          <Button
            className="comment-submit"
            color="primary"
            variant="contained"
            type="submit"
            disabled={loading}
          >
            投稿する
          </Button>
        </div>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}
