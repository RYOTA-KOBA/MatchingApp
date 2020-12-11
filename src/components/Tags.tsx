import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// material ui
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      //   width: "50%",
      maxWidth: 270,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

export default function Tags() {
  const classes = useStyles();
  const history = useHistory();

  const isSelected = (category: string) => {
    history.push(`/?category=${category}`);
  };

  return (
    <>
      <List className={classes.root} aria-label="contacts">
        <ListItem button onClick={() => isSelected("backend")}>
          <ListItemText primary="#バックエンド" id="backend" />
        </ListItem>
        <ListItem button onClick={() => isSelected("frontend")}>
          <ListItemText primary="#フロントエンド" id="frontend" />
        </ListItem>
      </List>
    </>
  );
}
