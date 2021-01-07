import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

export default function FeedSelector() {
  const classes = useStyles();
  const history = useHistory();
  const { currentUser }: any = useAuth();
  const [age, setAge] = React.useState("");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
  };

  const isSelected = (category: string) => {
    history.push(`/?category=${category}`);
  };

  const isTimeLineSelected = (userId: string) => {
    history.push(`/?timeline=${userId}`);
  };

  return (
    <>
      <FormControl variant="filled" className="home-card-head-feed">
        <InputLabel id="feed-select">Feed</InputLabel>
        <Select
          labelId="feed-select"
          id="feed-select"
          value={age}
          onChange={handleChange}
        >
          <MenuItem value="" onClick={() => history.push("/")}>
            <em>None</em>
          </MenuItem>
          <MenuItem
            value={"#バックエンド"}
            onClick={() => isSelected("backend")}
          >
            #バックエンド
          </MenuItem>
          <MenuItem
            value={"#フロントエンド"}
            onClick={() => isSelected("frontend")}
          >
            #フロントエンド
          </MenuItem>
          <MenuItem
            value={"#インフラエンジニア"}
            onClick={() => isSelected("infra")}
          >
            #インフラエンジニア
          </MenuItem>
          <MenuItem
            value={"#デザイナー"}
            onClick={() => isSelected("designer")}
          >
            #デザイナー
          </MenuItem>
          <Divider />
          <MenuItem
            value={"タイムライン"}
            onClick={() => isTimeLineSelected(currentUser.uid)}
          >
            タイムライン
          </MenuItem>
        </Select>
      </FormControl>
    </>
  );
}
