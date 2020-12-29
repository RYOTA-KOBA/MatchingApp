import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";

//material ui
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: 15,
    maxHeight: "200px",
    position: "relative",
    borderRadius: "12px",
  },
  avatar: {
    margin: "20px",
  },
  usernameLink: {
    color: "#0000008A",
    "&:hover": {
      color: "#333333",
      textDecoration: "none",
    },
  },
  cardWrapLink: {
    color: "#363d44",
    "&:hover": {
      textDecoration: "none",
    },
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
    flexDirection: "column",
    flexWrap: "wrap",
    display: "flex",
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

export default function BookmarkListItem({
  authorName,
  content,
  createdAt,
  title,
  post_id,
  uid,
  id,
}: any) {
  const classes = useStyles();
  const { removePostFromBookmark }: any = useAuth();
  const [saved, setSaved] = useState(true);
  const [images, setImages] = useState("");

  const removeBookmark = async () => {
    setSaved(false);
    await removePostFromBookmark(id);
  };

  useEffect(() => {
    db.collection("users")
      .doc(uid)
      .get()
      .then((snapshot: any) => {
        const data = snapshot.data();
        console.log(data);
        if (data.images !== undefined) {
          setImages(data.images[0].path);
        }
      });
  }, []);

  return (
    <>
      {saved === true && (
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
                  <Avatar className={classes.avatar}>
                    <PersonIcon />
                  </Avatar>
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
          </div>
          <Link to={"/detail/" + post_id} className={classes.cardWrapLink}>
            <CardContent style={{ paddingBottom: "0", paddingTop: "0" }}>
              <Typography variant="h5" component="h3">
                {title}
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
              <Link to={"/detail/" + post_id} className={classes.detailLink}>
                <Button className={classes.detailButton} size="small">
                  詳細を表示
                </Button>
              </Link>
            </CardActions>
          </Link>
          <IconButton
            className={classes.likeBtn}
            onClick={() => removeBookmark()}
          >
            <BookmarkIcon />
          </IconButton>
        </Card>
      )}
    </>
  );
}
