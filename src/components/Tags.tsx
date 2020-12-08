import React from "react";

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
  return (
    <>
      <List className={classes.root} aria-label="contacts">
        <ListItem button>
          <ListItemText primary="#バックエンド" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="#フロントエンド" />
        </ListItem>
      </List>
    </>
  );
}
