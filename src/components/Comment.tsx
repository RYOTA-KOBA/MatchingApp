import React, { useEffect, useState } from "react";
import { db } from "../firebase";

export default function Comment({ id, uid, content, createdAt }: any) {
  const [commentUsername, setCommentUsername] = useState();

  useEffect(() => {
    db.collection("users")
      .doc(uid)
      .get()
      .then((snapshot) => {
        const data: any = snapshot.data();
        const username = data.username;
        setCommentUsername(username);
      });
  }, []);

  return (
    <div className="comment-block">
      <p>{commentUsername}</p>
      <p>{content}</p>
      <p>{createdAt}</p>
    </div>
  );
}
