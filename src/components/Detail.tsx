import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import CommentForm from "./CommentForm";

//materialUI
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles({
  backLink: {
    "&:hover": {
      textDecoration: "none",
    },
  },
  backButton: {
    "&:focus": {
      outline: "none",
    },
  },
  root: {
    width: "100%",
    marginTop: "15px",
    borderRadius: "12px",
  },
  threeDots: {
    float: "right",
    "&:focus": {
      outline: "none",
    },
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  editLink: {
    color: "#000000DE",
    "&:hover": {
      textDecoration: "none",
      color: "#000000DE",
    },
  },
  title: {
    fontSize: 20,
    color: "#000",
    marginTop: "8px",
  },
  pos: {
    marginBottom: 12,
  },
  useername: {
    color: "#0000008A",
    "&:hover": {
      textDecoration: "none",
      opacity: "0.8",
      color: "#000000",
    },
  },
  time: {
    fontSize: "14px",
    marginTop: "15px",
    marginRight: "8px",
    textAlign: "right",
  },
});

type P = Partial<{
  authorName: string;
  content: string;
  createdAt: any;
  title: string;
  id: string;
  uid: string;
}>;

export default function Detail() {
  const classes = useStyles();
  const path = window.location.href;
  const id = path.split("/detail/")[1];
  const [postDetail, setPostDetail] = useState([]);
  const { currentUser }: any = useAuth();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open: boolean = Boolean(anchorEl);

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

  const getPost = async () => {
    let post: any = [];
    await db
      .collection("posts")
      .doc(id)
      .get()
      .then((doc: any) => {
        const data = doc.data();

        const date = new Date(data.createdAt.seconds * 1000);
        const Day = date.toLocaleDateString("ja-JP");
        const Time = date.toLocaleTimeString("ja-JP");

        post.push({
          authorName: data.authorName,
          content: data.content,
          title: data.title,
          createdAt: Day + " " + Time,
          uid: data.uid,
          id: doc.id,
        });
      });
    setPostDetail(post);
  };

  useEffect(() => {
    getPost();
  }, [setPostDetail]);

  return (
    <div className="card-maxWith">
      <div style={{ marginTop: "100px" }}>
        <Link to="/" className={classes.backLink}>
          <Button className={classes.backButton}>トップに戻る</Button>
        </Link>
        {postDetail.map((post: P) => (
          <Card className={classes.root} key={post.id} variant="outlined">
            <CardContent>
              {post.uid === currentUser.uid && (
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
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {post.title}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                <Link
                  className={classes.useername}
                  to={"/userprofile/" + post.uid}
                >
                  {post.authorName}
                </Link>
              </Typography>
              <Typography variant="body2" component="p">
                {post.content}
              </Typography>
              <Typography className={classes.time} color="textSecondary">
                {post.createdAt}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className={classes.root} variant="outlined">
        <h3 className="comments-title">Comments</h3>
        <CommentForm id={id} />
      </Card>
    </div>
  );
}
