import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { db } from "../firebase";

// materialUI
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Alert from "@material-ui/lab/Alert";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 250,
    marginBottom: "20px",
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

type postType = Partial<{
  title: string;
  createdAt: any;
  content: string;
  category: string;
}>;

export default function PostEdit() {
  const classes = useStyles();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPost, setCurrentPost] = useState([]);
  const titleRef: any = useRef();
  const contentRef: any = useRef();
  const path = window.location.href;
  const post_id = path.split("/postedit/")[1];
  const { editPost }: any = useAuth();
  const [category, setCategory] = useState("");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCategory(event.target.value as string);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (titleRef.current.value.length > 42) {
      return setError("タイトルは42文字以内で入力してください");
    }
    if (titleRef.current.value === "") {
      return setError("タイトルは入力必須項目です");
    }
    if (contentRef.current.value === "") {
      return setError("必須の入力項目が空です。");
    }

    const id = post_id;
    await db
      .collection("posts")
      .doc(id)
      .get()
      .then((snapshot: any) => {
        const data = snapshot.data();
        setLoading(true);
        setError("");
        return editPost(
          titleRef.current.value,
          contentRef.current.value,
          category,
          data
        );
      })
      .catch((error: any) => {
        console.log(error);
        setError("投稿の編集に失敗しました。");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    let post: any = [];
    db.collection("posts")
      .doc(post_id)
      .get()
      .then((doc: any) => {
        const data = doc.data();
        post.push(data);
        setCurrentPost(post);
      });
  }, [setCurrentPost]);

  return (
    <div className="card-maxWith">
      <Card className={classes.card} key={post_id}>
        <CardContent>
          <h2 className={classes.header}>投稿を編集</h2>
          {currentPost.map((post: postType) => (
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
                  defaultValue={post.title}
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
                  defaultValue={post.content}
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
                    <MenuItem value={"backend"}>
                      バックエンドエンジニア
                    </MenuItem>
                    <MenuItem value={"infra"}>インフラエンジニア</MenuItem>
                    <MenuItem value={"designer"}>デザイナー</MenuItem>
                  </Select>
                </FormControl>
                <br />
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
          ))}
        </CardContent>
      </Card>
      <Link to="/" className={classes.cancel}>
        キャンセル
      </Link>
    </div>
  );
}
