import React from "react";
import List from "@material-ui/core/List";
import Chat from "./Chat";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    chats: {
      height: "300px",
      padding: "0",
      overflow: "auto",
    },
  })
);

const Chats = (props: any) => {
  const classes = useStyles();

  return (
    <List className={classes.chats} id={"scroll-area"}>
      {props.chats.map((chat: any, index: any) => {
        return <Chat text={chat.text} type={chat.type} key={index} />;
      })}
    </List>
  );
};

export default Chats;
