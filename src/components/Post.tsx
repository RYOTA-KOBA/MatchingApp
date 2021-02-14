import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
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
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: 15,
    maxHeight: "250px",
    position: "relative",
    borderRadius: "12px",
  },
  cardWrapLink: {
    color: "#363d44",
    "&:hover": {
      textDecoration: "none",
    },
  },
  avatar: {
    margin: "20px",
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
    display: "flex",
    fontSize: "14px",
    flexDirection: "column",
    flexWrap: "wrap",
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
    maxHeight: "1.5em",
    marginTop: "8px",
    border: "1px solid #555555",
    borderRadius: "12px",
    paddingLeft: "5px",
    paddingRight: "5px",
  },
  detailBtnWrap: {
    float: "left",
    padding: "10px",
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

type PostProps = Partial<{
  authorName: string;
  content: string;
  createdAt: any;
  title: string;
  id: string;
  uid: string;
  category: string;
}>;

const Post = ({
  authorName,
  content,
  createdAt,
  title,
  id,
  uid,
  category,
}: PostProps) => {
  const classes = useStyles();
  const {
    currentUser,
    savePostToBookmark,
    removePostFromBookmark,
  }: any = useAuth();
  const [categoryJP, setCategoryJP] = useState("");
  const [savedId, setSavedId] = useState();
  const [saved, setSaved] = useState(false);
  const [images, setImages] = useState();
  const history = useHistory();
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
    const savedPosts: PostProps = {
      authorName,
      content,
      createdAt,
      title,
      id,
      uid,
      category,
    };
    await savePostToBookmark(savedPosts);
  };

  const removeBookmark = async (savedId: any | string) => {
    setSaved(false);
    await removePostFromBookmark(savedId);
  };

  const isSelected = (category: string) => {
    history.push(`/?category=${category}`);
  };

  const categoryToJPString = (category: string) => {
    switch (category) {
      case "backend":
        setCategoryJP("#バックエンド");
        break;
      case "frontend":
        setCategoryJP("#フロントエンド");
        break;
      case "infra":
        setCategoryJP("#インフラエンジニア");
        break;
      case "designer":
        setCategoryJP("#デザイナー");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (category !== undefined) categoryToJPString(category);
  }, []);

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

  useEffect(() => {
    db.collection("users")
      .doc(uid)
      .get()
      .then((snapshot): any => {
        const data: any = snapshot.data();
        if (data.images) {
          if (data.images.length !== 0) setImages(data.images[0].path);
        }
      });
  }, []);

  return (
    <>
      <Card className={classes.root}>
        <div className="post_card-head">
          <div className="post_card-head-left">
            <Link to={"/userprofile/" + uid}>
              {images ? (
                <Avatar
                  className={classes.avatar}
                  src={images}
                  alt="UserProfile Pic"
                />
              ) : (
                <Avatar className={classes.avatar} />
              )}
            </Link>
            <Typography className={classes.pos} color="textSecondary">
              <Link
                color="textSecondary"
                className={classes.usernameLink}
                to={"/userprofile/" + uid}
              >
                {authorName}
              </Link>
              {createdAt}
            </Typography>
          </div>
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
        </div>
        <Link to={"/detail/" + id} className={classes.cardWrapLink}>
          <CardContent style={{ paddingBottom: "0", paddingTop: "0" }}>
            <Typography className="post-title" variant="h5" component="h3">
              {title}
            </Typography>
          </CardContent>
        </Link>
        <CardContent
          className={category ? "category-txt-wrapper" : "display-none"}
        >
          <a
            className={classes.contentText}
            onClick={() => isSelected(`${category}`)}
          >
            {categoryJP}
          </a>
        </CardContent>
        <CardActions className={classes.detailBtnWrap}>
          <Link to={"/detail/" + id} className={classes.detailLink}>
            <Button className={classes.detailButton} size="small">
              詳細を表示
            </Button>
          </Link>
        </CardActions>

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
