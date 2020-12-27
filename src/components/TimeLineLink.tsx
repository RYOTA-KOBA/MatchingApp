import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// material ui
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import RssFeedIcon from "@material-ui/icons/RssFeed";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 270,
      backgroundColor: theme.palette.background.paper,
      borderRadius: "12px",
      marginTop: "20px",
    },
    feedicon: {
      marginRight: "5px",
      color: green[300],
    },
  })
);

export default function TimeLineLink() {
  const classes = useStyles();
  const history = useHistory();
  const { currentUser }: any = useAuth();

  const isSelected = (userId: string) => {
    history.push(`/?timeline=${userId}`);
  };

  return (
    <>
      <List className={classes.root} aria-label="contacts">
        <ListItem button onClick={() => isSelected(currentUser.uid)}>
          <RssFeedIcon className={classes.feedicon} />
          <ListItemText primary="タイムライン" id="timeline" />
        </ListItem>
      </List>
    </>
  );
}
