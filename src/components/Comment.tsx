import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

//material ui
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles({
  threeDots: {
    float: "right",
    "&:focus": {
      outline: "none",
    },
  },
  editLink: {
    color: "#000000DE",
    "&:hover": {
      textDecoration: "none",
      color: "#000000DE",
    },
  },
});

export default function Comment({ id, uid, content, createdAt, postId }: any) {
  const [commentUsername, setCommentUsername] = useState();
  const [time, setTime] = useState("");
  const { currentUser }: any = useAuth();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteComment = () => {
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .doc(id)
      .delete()
      .then(() => {
        console.log("削除成功");
      })
      .catch(() => {
        console.log("削除失敗");
      });
  };

  useEffect(() => {
    db.collection("users")
      .doc(uid)
      .get()
      .then((snapshot: any) => {
        const data: any = snapshot.data();
        const username = data.username;
        setCommentUsername(username);
      });
  }, []);

  useEffect(() => {
    const date = new Date(createdAt.seconds * 1000);
    const Day = date.toLocaleDateString("ja-JP");
    const Time = date.toLocaleTimeString("ja-JP");
    const DayTime = Day + " " + Time;

    setTime(DayTime);
  }, []);

  return (
    <div className="comment-block">
      {uid === currentUser.uid && (
        <IconButton className={classes.threeDots} onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
      )}
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: "150px",
          },
        }}
      >
        <MenuItem
          onClick={() => {
            deleteComment();
            handleClose();
          }}
        >
          削除する
        </MenuItem>
      </Menu>
      <p>{commentUsername}</p>
      <p>{content}</p>
      <p>{time}</p>
    </div>
  );
}
