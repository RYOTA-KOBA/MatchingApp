import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { Link } from "react-router-dom";

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

export default function MyPost({
  authorName,
  content,
  createdAt,
  title,
  id,
  uid,
}: any) {
  const classes = useStyles();
  const { currentUser }: any = useAuth();

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

  return (
    <>
      <Card className={classes.root}>
        <CardContent style={{ paddingBottom: "0" }}>
          <IconButton className={classes.threeDots} onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
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
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
                deletePost(id);
                handleClose();
              }}
            >
              削除する
            </MenuItem>
          </Menu>
          <Typography variant="h5" component="h3">
            {title}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {authorName + "・" + createdAt}
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
            <Button
              variant="contained"
              className={classes.detailButton}
              size="small"
            >
              詳細を表示
            </Button>
          </Link>
        </CardActions>
      </Card>
    </>
  );
}
