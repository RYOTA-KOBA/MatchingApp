import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import Post from "./Post";
import Tags from "./Tags";
import { red } from "@material-ui/core/colors";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import TimeLineLink from "./TimeLineLink";

const Home = () => {
  const [currentPost, setCurrentPost] = useState([]);
  // const [followedUid, setFollowedUid] = useState();
  const { followedUid, getFollowedUid }: any = useAuth();
  const query = window.location.search;
  const category = /^\?category=/.test(query)
    ? query.split("?category=")[1]
    : "";
  const following_uid = /^\?timeline=/.test(query)
    ? query.split("?timeline=")[1]
    : "";

  useEffect(() => {
    const f = async () => {
      await getFollowedUid(following_uid);
      console.log(...followedUid);
      getPosts(category, followedUid);
    };
    f();
  }, [query, getFollowedUid]);

  const getPosts = async (category: any, followedUid: any) => {
    let query = db.collection("posts").orderBy("createdAt", "desc");
    query = category !== "" ? query.where("category", "==", category) : query;
    console.log([...followedUid]);
    query =
      following_uid !== ""
        ? query.where("uid", "in", ["", ...followedUid])
        : query;

    let posts: any = [];
    await query.get().then((snapshot: any) => {
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
          <LocalOfferIcon style={{ color: red[500] }} />
          &nbsp; Tags
        </h5>
        <Tags />
        <TimeLineLink />
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
