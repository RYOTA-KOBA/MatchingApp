import React from "react";

import Button from "@material-ui/core/Button";

export default function CommentForm() {
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <textarea
          className="comment-textarea"
          name="content"
          id="content"
          placeholder="コメントを残す"
        ></textarea>
        <div className="comment-submit-wrapper">
          <Button
            className="comment-submit"
            color="primary"
            variant="contained"
            type="submit"
          >
            投稿する
          </Button>
        </div>
      </form>
    </>
  );
}
