import React, { useEffect, useState } from "react";
import { db } from "../firebase";

export default function Comment({ id, uid, content, createdAt }: any) {
  const [commentUsername, setCommentUsername] = useState();
  // const [time, setTime] = useState();

  useEffect(() => {
    console.log(createdAt);
    db.collection("users")
      .doc(uid)
      .get()
      .then((snapshot: any) => {
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
      {/* {console.log(createdAt)} */}
    </div>
  );
}
