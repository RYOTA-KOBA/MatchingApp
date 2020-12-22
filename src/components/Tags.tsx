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
      maxWidth: 270,
      backgroundColor: theme.palette.background.paper,
      borderRadius: "12px",
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
        <ListItem button onClick={() => isSelected("infra")}>
          <ListItemText primary="#インフラエンジニア" id="infra" />
        </ListItem>
        <ListItem button onClick={() => isSelected("designer")}>
          <ListItemText primary="#デザイナー" id="designer" />
        </ListItem>
      </List>
    </>
  );
}
