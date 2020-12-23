import React from "react";
import { useHistory } from "react-router-dom";

// material ui
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 270,
      backgroundColor: theme.palette.background.paper,
      borderRadius: "12px",
    },
  })
);

export default function TimeLineLink() {
  const classes = useStyles();
  const history = useHistory();

  const isSelected = (timeline: string) => {
    history.push(`${timeline}`);
  };

  return (
    <>
      <List className={classes.root} aria-label="contacts">
        <ListItem button onClick={() => isSelected("timeline")}>
          <ListItemText primary="タイムライン" id="timeline" />
        </ListItem>
      </List>
    </>
  );
}
