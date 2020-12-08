import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import Post from "./Post";
import Tags from "./Tags";
import { green } from "@material-ui/core/colors";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";

const Home = () => {
  const [currentPost, setCurrentPost] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    let posts: any = [];
    await db
      .collection("posts")
      .orderBy("createdAt", "desc")
      .get()
      .then((snapshot: any) => {
        snapshot.docs.forEach((doc: any) => {
          const data = doc.data();

          const date = new Date(data.createdAt.seconds * 1000);
          const Day = date.toLocaleDateString("ja-JP");
          const Time = date.toLocaleTimeString("ja-JP");

          posts.push({
            authorName: data.authorName,
            content: data.content,
            createdAt: Day + " " + Time,
            title: data.title,
            id: doc.id,
            uid: data.uid,
          });
        });

        setCurrentPost(posts);
      });
  };

  return (
    <div
      style={{
        marginTop: "100px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
      }}
    >
      <div style={{ width: "25%" }}>
        <h5 style={{ marginTop: "15px" }}>
          <LocalOfferIcon style={{ color: green[500] }} />
          &nbsp; Tags
        </h5>
        <Tags />
      </div>
      <div className="home-cardWith">
        <h3>Posts</h3>
        {currentPost.map((post: any) => (
          <Post
            key={post.id}
            authorName={post.authorName}
            content={post.content}
            createdAt={post.createdAt}
            title={post.title}
            id={post.id}
            uid={post.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
