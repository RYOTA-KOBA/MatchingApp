import React, { useEffect, useState } from "react";
import { db } from "../firebase";

export default function Comment({ id, uid, content, createdAt }: any) {
  const [commentUsername, setCommentUsername] = useState();
  const [time, setTime] = useState("");

  useEffect(() => {
    db.collection("users")
      .doc(uid)
      .get()
      .then((snapshot: any) => {
        const data: any = snapshot.data();
        const username = data.username;
        setCommentUsername(username);
      });
  }, []);

  useEffect(() => {
    const date = new Date(createdAt.seconds * 1000);
    const Day = date.toLocaleDateString("ja-JP");
    const Time = date.toLocaleTimeString("ja-JP");
    const DayTime = Day + " " + Time;

    setTime(DayTime);
  }, []);

  return (
    <div className="comment-block">
      <p>{commentUsername}</p>
      <p>{content}</p>
      <p>{time}</p>
    </div>
  );
}
