import React, { useRef, useState, useCallback, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { db } from "../firebase";

// materialUI
import { Theme, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Alert from "@material-ui/lab/Alert";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme: Theme) => ({
  formControl: {
    minWidth: 250,
    marginBottom: "20px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  alert: {
    marginBottom: "15px",
  },
  card: {
    width: "600px",
    padding: "30px",
    marginTop: "130px",
  },
  root: {
    margin: "0 auto",
    width: "500px",
    display: "flex",
    justifyContent: "center",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
  },
  postFormBox: {
    width: "90%",
  },
  postFormTextField: {
    width: "100%",
    marginBottom: "15px",
  },
  cancel: {
    textAlign: "center",
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
  },
}));

export default function PostForm() {
  const classes = useStyles();
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const titleRef = useRef();
  const contentRef = useRef();
  const { createPost, currentUser }: any = useAuth();
  const [category, setCategory] = useState("");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCategory(event.target.value as string);
  };

  const inputTitle = useCallback(
    (event) => {
      setTitle(event.target.value);
    },
    [setTitle]
  );

  const inputContent = useCallback(
    (event) => {
      setContent(event.target.value);
    },
    [setContent]
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (title.length > 42) {
      return setError("タイトルは42文字以内で入力してください");
    }
    if (title === "") {
      return setError("タイトルは入力必須項目です");
    }
    if (content === "") {
      return setError("入力内容が正しくありません");
    }

    setError("");
    setLoading(true);
    setTitle("");
    setContent("");

    try {
      const uid = currentUser.uid;
      await db
        .collection("users")
        .doc(uid)
        .get()
        .then((snapshot: any) => {
          const data = snapshot.data();
          const authorName = data.username;
          return createPost(title, content, authorName, uid, category);
        });
    } catch {
      setError("投稿に失敗しました");
      setLoading(false);
    }
  };

  return (
    <div className="card-maxWith">
      <Card className={classes.card}>
        {error && <Alert severity="error">{error}</Alert>}
        <CardContent>
          <h2 className={classes.header}>新規投稿を作成</h2>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <div className={classes.postFormBox}>
              <TextField
                type="text"
                label="タイトル"
                inputRef={titleRef}
                className={classes.postFormTextField}
                required
                value={title}
                onChange={inputTitle}
              />
              <br />
              <TextField
                type="text"
                label="内容"
                inputRef={contentRef}
                className={classes.postFormTextField}
                multiline={true}
                rows={4}
                required
                value={content}
                onChange={inputContent}
              />
              <br />
              <FormControl className={classes.formControl}>
                <InputLabel id="category-select-label">カテゴリー</InputLabel>
                <Select
                  labelId="category-select-label"
                  id="category-select"
                  value={category}
                  onChange={handleChange}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value={"frontend"}>
                    フロントエンドエンジニア
                  </MenuItem>
                  <MenuItem value={"backend"}>バックエンドエンジニア</MenuItem>
                  <MenuItem value={"infra"}>インフラエンジニア</MenuItem>
                  <MenuItem value={"designer"}>デザイナー</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                type="submit"
                color="primary"
                style={{ width: "100%", marginTop: "15px" }}
                disabled={loading}
              >
                投稿
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Link to="/" className={classes.cancel}>
        キャンセル
      </Link>
    </div>
  );
}
