import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { db } from "../firebase";
import MyPost from "./MyPost";
import FollowButton from "./FollowButton";

//materialUI
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import SettingsIcon from "@material-ui/icons/Settings";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import CircularProgress from "@material-ui/core/CircularProgress";

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
  followers: {
    display: "flex",
  },
  title: {
    fontSize: 20,
    color: "#000",
  },
  followbtn: {
    "&:focus": {
      outline: "none",
    },
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
    fontSize: ".8em",
    padding: ".5em 1em",
  },
});

export default function UserProfile() {
  const [docOflatest, setDocOflatest] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [loading, setLoading] = useState(false);
  const LoadBtnRef: any = useRef();
  const WrapperRef: any = useRef();
  const classes = useStyles();
  const { currentUser }: any = useAuth();
  const [error, setError] = useState("");
  const [post, setPost] = useState([]);
  const [user, setUser] = useState({
    email: "",
    username: "",
    images: [{ id: "", path: "" }],
    intro: "",
  });
  const path = window.location.href;
  const uid = path.split("/userprofile/")[1];
  const history = useHistory();
  const guestUser_uid = process.env.REACT_APP_GUESTUSER_UID;
  const [followsData, setFollowsData] = useState([]);
  const [followers, setFollowers] = useState(0);
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
      });
  }, []);

  let latestDoc: any = null;
  const f = async () => {
    let posts: any = post;
    const ref = db
      .collection("posts")
      .where("uid", "==", uid)
      .orderBy("createdAt", "desc")
      .startAfter(docOflatest || [])
      .limit(4);
    const data = await ref.get();
    data.docs.forEach((doc: any) => {
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

    latestDoc = data.docs[data.docs.length - 1];
    setDocOflatest(latestDoc);
    setLoading(false);
    if (data.empty) {
      setIsEmpty(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    f();
  }, [setPost]);

  const handleLoadClick = () => {
    f();
  };

  const handleLoadScroll = () => {
    let triggerHeight =
      WrapperRef.current.scrollTop + WrapperRef.current.offsetHeight;
    if (triggerHeight >= WrapperRef.current.scrollHeight) {
      if (isEmpty !== true) {
        setLoading(true);
        f();
      }
    }
  };

  useEffect(() => {
    const followingData: any = [];
    const unsubscribe = db
      .collection("follows")
      .where("following_uid", "==", currentUser.uid)
      .where("followed_uid", "==", uid)
      .onSnapshot((snapshots) => {
        snapshots.forEach((doc) => {
          const data = doc.data();
          followingData.push(data);
        });
        setFollowsData(followingData);
      });
    return unsubscribe;
  }, [setFollowsData, followers]);

  useEffect(() => {
    const unsubscribe = db
      .collection("follows")
      .where("followed_uid", "==", uid)
      .onSnapshot((snapshots) => {
        const numOfFollow = snapshots.size;
        setFollowers(numOfFollow);
      });
    return unsubscribe;
  }, [followers]);

  return (
    <div
      className="card-maxWith profile_card-wrapper"
      onScroll={handleLoadScroll}
      style={{ overflowY: "auto", maxHeight: "100%", boxSizing: "border-box" }}
      ref={WrapperRef}
    >
      <Card className="profile_card" variant="outlined">
        <CardContent className="content_wrapper">
          <div className="content_inner">
            {user.images ? (
              <Avatar
                src={user.images[0].path}
                className="profile_avatar-lg"
                alt="User Profile Pic"
              />
            ) : (
              <Avatar className="profile_avatar-lg">
                <PersonIcon />
              </Avatar>
            )}
            <div className="content_txt-wrapper">
              <h4 className="userProfile-name">{user.username}</h4>
              <Typography>
                <p className="userProfile-intro">{user.intro}</p>
              </Typography>
              <Typography className={classes.followers}>
                <strong className="follower-text">
                  Followers<span className="follower-number">{followers}</span>
                </strong>
              </Typography>
            </div>
          </div>
          <div className="user_btn-wrapper">
            <div className="user_btn-inner">
              {currentUser.uid === uid && (
                <Button
                  variant="contained"
                  className={classes.user_edit_btn}
                  onClick={isNotGuest}
                  startIcon={<SettingsIcon />}
                >
                  Edit
                </Button>
              )}
              {followsData.some((data: any) => data.id) ? (
                followsData.map((data: any) => (
                  <FollowButton
                    key={uid}
                    uid={uid}
                    id={data.id}
                    following_uid={data.following_uid}
                    followed_uid={data.followed_uid}
                  />
                ))
              ) : (
                <FollowButton uid={uid} />
              )}
            </div>
          </div>
        </CardContent>
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
            images={user.images && user.images[0].path}
          />
        ))}
      </div>
      <div>
        <button
          style={{ display: "none" }}
          ref={LoadBtnRef}
          className="loadMore"
          onClick={handleLoadClick}
        >
          Load More
        </button>
      </div>
      <p className={loading ? "text-center loading-message" : "display-none"}>
        Loading...
      </p>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}
