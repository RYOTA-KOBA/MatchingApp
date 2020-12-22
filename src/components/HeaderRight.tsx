import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

//material ui
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  headerRightButton: {
    "&:hover": {
      textDecoration: "none",
    },
  },
  avatar: {
    backgroundColor: red[500],
    cursor: "pointer",
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
  dashboardLink: {
    color: "#333333",
    "&:hover": {
      textDecoration: "none",
      color: "#333333",
    },
  },
  logout: {
    "&:hover": {
      backgroundColor: red[500],
      color: "#ffffff",
    },
  },
}));

export default function HeaderRight() {
  const classes = useStyles();
  const { currentUser, logout }: any = useAuth();
  const [userNameInitial, setUserNameInitial] = useState();
  const [error, setError] = useState("");
  const history = useHistory();
  const guestUser_uid = process.env.REACT_APP_GUESTUSER_UID;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("ログアウトに失敗しました");
    }
  };

  useEffect(() => {
    const id = currentUser.uid;
    db.collection("users")
      .doc(id)
      .get()
      .then((snapshot: any) => {
        const data = snapshot.data();
        const username = data.username;
        const initial = username.slice(0, 1);
        setUserNameInitial(initial);
      });
  }, [currentUser.uid]);

  return (
    <div className={classes.headerRight}>
      {error && <Alert severity="error">{error}</Alert>}
      <Link to="/postform" className={classes.postFormLink}>
        <Button className={classes.postFormButton}>新規投稿</Button>
      </Link>
      <Link to="/bookmarkList">
        <IconButton className={classes.bookMark}>
          <LibraryBooksIcon />
        </IconButton>
      </Link>
      <Avatar
        aria-label="recipe"
        className={classes.avatar}
        onClick={handleClick}
      >
        {userNameInitial}
      </Avatar>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        autoFocus={false}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: "150px",
            marginTop: "44px",
          },
        }}
      >
        <Link
          to={"/userprofile/" + currentUser.uid}
          className={classes.dashboardLink}
        >
          <MenuItem
            onClick={() => {
              handleClose();
            }}
          >
            ダッシュボード
          </MenuItem>
        </Link>
        {currentUser.uid !== guestUser_uid && (
          <Link to="/update-profile" className={classes.dashboardLink}>
            <MenuItem
              onClick={() => {
                handleClose();
              }}
            >
              設定
            </MenuItem>
          </Link>
        )}
        <MenuItem
          onClick={() => {
            handleLogout();
            handleClose();
          }}
          className={classes.logout}
        >
          ログアウト
        </MenuItem>
      </Menu>
    </div>
  );
}
