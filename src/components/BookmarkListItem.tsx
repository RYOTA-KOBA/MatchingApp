import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
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

type BookmarkListProps = Partial<{
  authorName: string;
  content: string;
  createdAt: any;
  title: string;
  post_id: string;
  id: string;
  uid: string;
  category: string;
}>;

export default function BookmarkListItem({
  authorName,
  content,
  createdAt,
  title,
  post_id,
  uid,
  id,
  category,
}: BookmarkListProps) {
  const classes = useStyles();
  const history = useHistory();
  const { removePostFromBookmark }: any = useAuth();
  const [saved, setSaved] = useState(true);
  const [images, setImages] = useState("");
  const [categoryJP, setCategoryJP] = useState("");

  const removeBookmark = async () => {
    setSaved(false);
    await removePostFromBookmark(id);
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

  const isSelected = (category: string) => {
    history.push(`/?category=${category}`);
  };

  useEffect(() => {
    db.collection("users")
      .doc(uid)
      .get()
      .then((snapshot: any) => {
        const data = snapshot.data();
        if (data.images !== undefined) {
          setImages(data.images[0].path);
        }
      });
  }, []);

  useEffect(() => {
    if (category !== undefined) categoryToJPString(category);
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
            <Typography
              className="post-title detail-title"
              variant="h5"
              component="h3"
              style={{ paddingRight: "16px" }}
            >
              {title}
            </Typography>
          </Link>
          <Typography className="detail-category bookmark-category-wrapper">
            <a
              className={category ? "detail-category-link" : "display-none"}
              onClick={() => isSelected(`${category}`)}
            >
              {categoryJP}
            </a>
          </Typography>
          <CardActions className={classes.detailBtnWrap}>
            <Link to={"/detail/" + post_id} className={classes.detailLink}>
              <Button className={classes.detailButton} size="small">
                詳細を表示
              </Button>
            </Link>
          </CardActions>
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
