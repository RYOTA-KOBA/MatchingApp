import React from "react";
// @ts-expect-error ts-migrate(6142) FIXME: Module '../contexts/AuthContext' was resolved to '... Remove this comment to see the full error message
import { useAuth } from "../contexts/AuthContext";
// @ts-expect-error ts-migrate(6142) FIXME: Module '../firebase' was resolved to '/Users/ryota... Remove this comment to see the full error message
import { db } from "../firebase";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
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
  uid
}: any) {
  const classes = useStyles();
  const { currentUser } = useAuth();

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
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Card className={classes.root}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <CardContent style={{ paddingBottom: "0" }}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <IconButton className={classes.threeDots} onClick={handleClick}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <MoreVertIcon />
          </IconButton>
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
      </Card>
    </>
  );
}
