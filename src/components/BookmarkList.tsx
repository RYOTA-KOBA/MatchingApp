import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import BookmarkListItem from "./BookmarkListItem";

type BookmarkListItemProp = {
  saveId: string;
  authorName: string;
  content: string;
  createdAt: string;
  title: string;
  post_id: string;
};

export default function BookmarkList() {
  const { currentUser }: any = useAuth();
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const uid = currentUser.uid;
    let posts: any = [];
    db.collection("users")
      .doc(uid)
      .collection("bookmarks")
      .get()
      .then((snapshots: any) => {
        snapshots.docs.forEach((doc: any) => {
          const data = doc.data();

          posts.push({
            authorName: data.authorName,
            content: data.content,
            createdAt: data.createdAt,
            title: data.title,
            saveId: doc.id,
            uid: data.uid,
            post_id: data.id,
          });
        });
        setBookmarks(posts);
      });
  }, [currentUser.uid]);

  return (
    <>
      <div style={{ marginTop: "100px" }}>
        <h3>保存した投稿</h3>
        {bookmarks.map((bookmark: any) => (
          <BookmarkListItem
            key={bookmark.saveId}
            authorName={bookmark.authorName}
            content={bookmark.content}
            createdAt={bookmark.createdAt}
            title={bookmark.title}
            // bookmarkのid
            id={bookmark.saveId}
            post_id={bookmark.post_id}
          />
        ))}
      </div>
    </>
  );
}
