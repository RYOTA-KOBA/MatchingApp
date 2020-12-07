import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
// @ts-expect-error ts-migrate(6142) FIXME: Module '../contexts/AuthContext' was resolved to '... Remove this comment to see the full error message
import { useAuth } from "../contexts/AuthContext";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Link, useHistory } from "react-router-dom";
// @ts-expect-error ts-migrate(6142) FIXME: Module '../firebase' was resolved to '/Users/ryota... Remove this comment to see the full error message
import { db } from "../firebase";
// @ts-expect-error ts-migrate(6142) FIXME: Module './MyPost' was resolved to '/Users/ryota/Li... Remove this comment to see the full error message
import MyPost from "./MyPost";

//materialUI
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: "130px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 20,
    color: "#000",
  },
  pos: {
    marginBottom: 12,
    marginTop: 30,
  },
  edit_btn: {
    "&:hover": {
      textDecoration: "none",
    },
  },
  user_edit_btn: {
    "&:focus": {
      outline: "none",
    },
    fontWeight: "bold",
  },
});

export default function Dashboard() {
  const classes = useStyles();
  const { currentUser, setCurrentUser } = useAuth();
  const [error, setError] = useState("");
  const [post, setPost] = useState([]);

  useEffect(() => {
    const uid = currentUser.uid;
    db.collection("users")
      .doc(uid)
      .get()
      .then((snapshot: any) => {
        const data = snapshot.data();
        setCurrentUser(data);
      });
  }, [currentUser.uid, setCurrentUser]);

  useEffect(() => {
    let posts: any = [];
    db.collection("posts")
      .orderBy("createdAt", "desc")
      .get()
      .then((snapshot: any) => {
        snapshot.docs.forEach((doc: any) => {
          const data = doc.data();

          if (data.uid === currentUser.uid) {
            const date = new Date(data.createdAt.seconds * 1000);
            const Day = date.toLocaleDateString("ja-JP");
            const Time = date.toLocaleTimeString("ja-JP");

            posts.push({
              authorName: data.authorName,
              content: data.content,
              createdAt: Day + " " + Time,
              title: data.title,
              id: doc.id,
              uid: data.uid,
            });
          }
        });
        setPost(posts);
      });
  }, [currentUser.uid]);

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Card className={classes.root}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <CardContent>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <h2 className="text-center mb-4">プロフィール</h2>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          {error && <Alert variant="danger">{error}</Alert>}
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Typography className={classes.pos} color="textSecondary">
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <strong>Email:</strong> {currentUser.email}
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <br />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <strong>名前:</strong> {currentUser.username}
          </Typography>
        </CardContent>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <CardActions>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Link to="/update-profile" className={classes.edit_btn}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Button variant="contained" className={classes.user_edit_btn}>
              ユーザー設定
            </Button>
          </Link>
        </CardActions>
      </Card>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div>
        {post.map((myPost) => (
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <MyPost
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type 'never'.
            key={myPost.id}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'authorName' does not exist on type 'neve... Remove this comment to see the full error message
            authorName={myPost.authorName}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'content' does not exist on type 'never'.
            content={myPost.content}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'createdAt' does not exist on type 'never... Remove this comment to see the full error message
            createdAt={myPost.createdAt}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type 'never'.
            title={myPost.title}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type 'never'.
            id={myPost.id}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'uid' does not exist on type 'never'.
            uid={myPost.uid}
          />
        ))}
      </div>
    </>
  );
}
