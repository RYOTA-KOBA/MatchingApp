import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

//material ui
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: 15,
    maxHeight: "200px",
    position: "relative",
    borderRadius: "12px",
  },
  cardWrapLink: {
    color: "#363d44",
    "&:hover": {
      textDecoration: "none",
    },
  },
  threeDots: {
    float: "right",
    margin: "16px",
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
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    fontSize: "14px",
    marginTop: "8px",
  },
  usernameLink: {
    color: "#0000008A",
    "&:hover": {
      color: "#333333",
      textDecoration: "none",
    },
  },
  contentText: {
    overflow: "hidden",
    lineHeight: "1.5",
    maxHeight: "3em",
    marginTop: "8px",
  },
  detailBtnWrap: {
    float: "left",
  },
  detailLink: {
    "&:hover": {
      textDecoration: "none",
    },
  },
  detailButton: {
    backgroundColor: "#fff",
    fontWeight: "bold",
    color: "#555555",
    padding: "8px 10px",
    "&:focus": {
      outline: "none",
    },
  },
  likeBtn: {
    float: "right",
    marginRight: "16px",
    "&:focus": {
      outline: "none",
    },
  },
});

const Post = ({ authorName, content, createdAt, title, id, uid }: any) => {
  const classes = useStyles();
  const {
    currentUser,
    savePostToBookmark,
    removePostFromBookmark,
  }: any = useAuth();
  const [savedId, setSavedId] = useState();
  const [saved, setSaved] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deletePost = () => {
    db.collection("posts")
      .doc(id)
      .delete()
      .then(() => {
        console.log("削除成功！！");
        window.location.reload();
      })
      .catch(() => console.log("削除失敗!!"));
  };

  const savePost = async () => {
    setSaved(true);
    const savedPosts = { authorName, content, createdAt, title, id };
    await savePostToBookmark(savedPosts);
  };

  const removeBookmark = async (savedId: any) => {
    setSaved(false);
    await removePostFromBookmark(savedId);
  };

  useEffect(() => {
    const uid = currentUser.uid;
    db.collection("users")
      .doc(uid)
      .get()
      .then((doc: any) => {
        if (doc.exists) {
          db.collection("users")
            .doc(uid)
            .collection("bookmarks")
            .get()
            .then((snapshots: any) => {
              snapshots.docs.forEach((doc: any) => {
                const data = doc.data();
                // post_idはbookmarkしたpostのid
                const post_id = data.id;
                const saveId = data.saveId;
                if (post_id === id) {
                  setSaved(true);
                  setSavedId(saveId);
                }
              });
            });
        }
      });
  }, [currentUser.uid, id, saved]);

  return (
    <>
      <Card className={classes.root}>
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
              handleClose();
            }}
          >
            <Link to={"/postedit/" + id} className={classes.editLink}>
              編集する
            </Link>
          </MenuItem>
          <MenuItem
            onClick={() => {
              deletePost();
              handleClose();
            }}
          >
            削除する
          </MenuItem>
        </Menu>
        <Link to={"/detail/" + id} className={classes.cardWrapLink}>
          <CardContent style={{ paddingBottom: "0" }}>
            <Typography variant="h5" component="h3">
              {title}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              <Link
                color="textSecondary"
                className={classes.usernameLink}
                to={"/userprofile/" + uid}
              >
                {authorName}
              </Link>
              {"・" + createdAt}
            </Typography>
            <Typography
              className={classes.contentText}
              variant="body2"
              component="p"
            >
              {content}
            </Typography>
          </CardContent>
          <CardActions className={classes.detailBtnWrap}>
            <Link to={"/detail/" + id} className={classes.detailLink}>
              <Button className={classes.detailButton} size="small">
                詳細を表示
              </Button>
            </Link>
          </CardActions>
        </Link>
        {saved === true ? (
          <IconButton
            className={classes.likeBtn}
            onClick={() => removeBookmark(savedId)}
          >
            <BookmarkIcon />
          </IconButton>
        ) : (
          <IconButton className={classes.likeBtn} onClick={savePost}>
            <BookmarkBorderIcon />
          </IconButton>
        )}
      </Card>
    </>
  );
};
export default Post;
