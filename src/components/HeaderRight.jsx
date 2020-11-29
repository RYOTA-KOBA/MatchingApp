import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

//material ui
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  headerRightButton: {
    "&:hover": {
      textDecoration: "none",
    },
  },
  avatar: {
    backgroundColor: red[500],
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
  },
  postFormButton: {
    backgroundColor: "#1976d2",
    fontWeight: "bold",
    color: "#ffffff",
    "&:focus": {
      outline: "none",
    },
  },
  postFormLink: {
    marginRight: "15px",
    letterSpacing: "0.6px",
    "&:hover": {
      textDecoration: "none",
      color: "#ffffff",
    },
  },
  bookMark: {
    marginRight: "15px",
    color: "#fff",
    "&:focus": {
      outline: "none",
    },
  },
  avatarLink: {
    color: "white",
    "&:hover": {
      textDecoration: "none",
      color: "white",
    },
  },
}));

export default function HeaderRight() {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [userNameInitial, setUserNameInitial] = useState();

  useEffect(() => {
    const id = currentUser.uid;
    db.collection("users")
      .doc(id)
      .get()
      .then((snapshot) => {
        const data = snapshot.data();
        const username = data.username;
        const initial = username.slice(0, 1);
        setUserNameInitial(initial);
      });
  }, []);

  return (
    <div className={classes.headerRight}>
      <Link to="/postform" className={classes.postFormLink}>
        <Button className={classes.postFormButton}>新規投稿</Button>
      </Link>
      <Link to="/bookmarkList">
        <IconButton className={classes.bookMark}>
          <LibraryBooksIcon />
        </IconButton>
      </Link>
      <Link to="/dashboard" className={classes.avatarLink}>
        <Avatar aria-label="recipe" className={classes.avatar}>
          {userNameInitial}
        </Avatar>
      </Link>
    </div>
  );
}
