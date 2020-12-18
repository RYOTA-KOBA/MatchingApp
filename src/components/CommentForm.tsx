import React, { useCallback, useState, useEffect } from "react";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import Comment from "./Comment";

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
  const [open, setOpen] = React.useState(false);
  const [comment, setComment] = useState([]);

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

    try {
      setError("");
      setLoading(true);
      const uid = currentUser.uid;
      return createComment(id, content, uid);
    } catch {
      setError("投稿に失敗しました");
      setOpen(true);
    } finally {
      setLoading(false);
      setContent("");
    }
  };

  useEffect(() => {
    let comments: any = [];
    const unsubscribe: any = db
      .collection("posts")
      .doc(id)
      .collection("comments")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshots) => {
        snapshots.docChanges().forEach((change) => {
          const data = change.doc.data({ serverTimestamps: "estimate" });
          const changeType = change.type;

          switch (changeType) {
            case "added":
              comments.push(data);
              break;
            case "modified":
              const index = comments.findIndex(
                (comment: any) => comment.id === change.doc.id
              );
              comments[index] = comment;
              break;
            case "removed":
              comments = comments.filter(
                (comment: any) => comment.id !== change.doc.id
              );
              break;
            default:
              break;
          }
        });
        setComment(comments);
      });
    return unsubscribe;
  }, []);

  return (
    <>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <textarea
          className="comment-textarea"
          name="content"
          id="content"
          placeholder="コメントを残す"
          onChange={inputContent}
          value={content}
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
      {/* {console.log(comment)} */}
      {comment.map((commentItem: any) => (
        <Comment
          key={commentItem.id}
          id={commentItem.id}
          uid={commentItem.uid}
          content={commentItem.content}
          createdAt={commentItem.createdAt}
        />
      ))}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}
