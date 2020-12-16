import React, { useEffect, useState } from "react";
import { db } from "../firebase";

export default function Comment({ id, uid, content, createdAt }: any) {
  const [commentUsername, setCommentUsername] = useState();

  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .doc(uid)
      .onSnapshot((snapshot) => {
        const data: any = snapshot.data();
        const username = data.username;
        setCommentUsername(username);
        console.log(username);
      });
    return () => unsubscribe();
  }, []);

  return (
    <div className="comment-block">
      <p>{commentUsername}</p>
      <p>{content}</p>
      {/* <p>{createdAt}</p> */}
    </div>
  );
}
