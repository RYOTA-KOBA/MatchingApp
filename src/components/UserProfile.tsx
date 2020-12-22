import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { db } from "../firebase";
import MyPost from "./MyPost";

//materialUI
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
  const history = useHistory();
  const guestUser_uid = process.env.REACT_APP_GUESTUSER_UID;
  const [open, setOpen] = React.useState(false);
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const isNotGuest = () => {
    if (currentUser.uid === guestUser_uid) {
      return setError("ゲストユーザーは編集できません"), setOpen(true);
    }
    history.push("/update-profile");
  };

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
          <Typography className={classes.pos} color="textSecondary">
            <strong>Email:</strong> {user.email}
            <br />
            <strong>名前:</strong> {user.username}
          </Typography>
        </CardContent>
        {currentUser.uid === uid && (
          <CardActions>
            <Button
              variant="contained"
              className={classes.user_edit_btn}
              onClick={isNotGuest}
            >
              ユーザー設定
            </Button>
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
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}
