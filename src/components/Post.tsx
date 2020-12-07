import React, { useState, useEffect } from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Link } from "react-router-dom";
// @ts-expect-error ts-migrate(6142) FIXME: Module '../firebase' was resolved to '/Users/ryota... Remove this comment to see the full error message
import { db } from "../firebase";
// @ts-expect-error ts-migrate(6142) FIXME: Module '../contexts/AuthContext' was resolved to '... Remove this comment to see the full error message
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
  },
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
    backgroundColor: "#d2d6db",
    color: "#363d44",
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

const Post = ({
  authorName,
  content,
  createdAt,
  title,
  id,
  uid
}: any) => {
  const classes = useStyles();
  const { currentUser, savePostToBookmark, removePostFromBookmark } = useAuth();
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
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Card className={classes.root}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <CardContent style={{ paddingBottom: "0" }}>
          {uid === currentUser.uid && (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <IconButton className={classes.threeDots} onClick={handleClick}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <MoreVertIcon />
            </IconButton>
          )}
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <MenuItem
              onClick={() => {
                handleClose();
              }}
            >
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Link to={"/postedit/" + id} className={classes.editLink}>
                編集する
              </Link>
            </MenuItem>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <MenuItem
              onClick={() => {
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
                deletePost(id);
                handleClose();
              }}
            >
              削除する
            </MenuItem>
          </Menu>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Typography variant="h5" component="h3">
            {title}
          </Typography>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Typography className={classes.pos} color="textSecondary">
            {authorName + "・" + createdAt}
          </Typography>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Typography
            className={classes.contentText}
            variant="body2"
            component="p"
          >
            {content}
          </Typography>
        </CardContent>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <CardActions className={classes.detailBtnWrap}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Link to={"/detail/" + id} className={classes.detailLink}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Button
              variant="contained"
              className={classes.detailButton}
              size="small"
            >
              詳細を表示
            </Button>
          </Link>
        </CardActions>
        {saved === true ? (
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <IconButton
            className={classes.likeBtn}
            onClick={() => removeBookmark(savedId)}
          >
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <BookmarkIcon />
          </IconButton>
        ) : (
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <IconButton className={classes.likeBtn} onClick={savePost}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <BookmarkBorderIcon />
          </IconButton>
        )}
      </Card>
    </>
  );
};
export default Post;
