import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { db } from "../firebase";
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
    borderRadius: "12px",
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

export default function UserProfile() {
  const classes = useStyles();
  const { currentUser }: any = useAuth();
  const [error, setError] = useState("");
  const [post, setPost] = useState([]);
  const [user, setUser] = useState({
    email: "",
    username: "",
  });
  const path = window.location.href;
  const uid = path.split("/userprofile/")[1];
  const guestUser_uid = process.env.REACT_APP_GUESTUSER_UID;

  useEffect(() => {
    db.collection("users")
      .doc(uid)
      .get()
      .then((snapshot: any) => {
        const data = snapshot.data();
        setUser(data);
        console.log(data);
      });
  }, []);

  useEffect(() => {
    let posts: any = [];
    db.collection("posts")
      .where("uid", "==", uid)
      .get()
      .then((snapshot: any) => {
        snapshot.docs.forEach((doc: any) => {
          const data = doc.data();

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
        });
        setPost(posts);
      });
  }, []);

  return (
    <div className="card-maxWith">
      <Card className={classes.root}>
        <CardContent>
          <h2 className="text-center mb-4">プロフィール</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Typography className={classes.pos} color="textSecondary">
            <strong>Email:</strong> {user.email}
            <br />
            <strong>名前:</strong> {user.username}
          </Typography>
        </CardContent>
        {currentUser.uid === uid && currentUser.uid !== guestUser_uid && (
          <CardActions>
            <Link to="/update-profile" className={classes.edit_btn}>
              <Button variant="contained" className={classes.user_edit_btn}>
                ユーザー設定
              </Button>
            </Link>
          </CardActions>
        )}
      </Card>
      <div>
        {post.map((post: any) => (
          <MyPost
            key={post.id}
            authorName={post.authorName}
            content={post.content}
            createdAt={post.createdAt}
            title={post.title}
            id={post.id}
            uid={post.uid}
          />
        ))}
      </div>
    </div>
  );
}
