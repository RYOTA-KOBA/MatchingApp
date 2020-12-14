import React from "react";

export default function Comment({ id, uid, content, createdAt }: any) {
  return (
    <div className="comment-block">
      <p>{content}</p>
      <p>{createdAt}</p>
    </div>
  );
}
