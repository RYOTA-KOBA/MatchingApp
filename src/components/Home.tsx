import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import Post from "./Post";
import Tags from "./Tags";
import FeedSelector from "./FeedSelector";
import TimeLineLink from "./TimeLineLink";

// material ui
import { red } from "@material-ui/core/colors";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";

const Home = () => {
  const [currentPost, setCurrentPost] = useState([]);
  const { setFollowedUid, followedUid, getFollowedUid }: any = useAuth();
  const query = window.location.search;
  const category = /^\?category=/.test(query)
    ? query.split("?category=")[1]
    : "";
  const following_uid = /^\?timeline=/.test(query)
    ? query.split("?timeline=")[1]
    : "";

  useEffect(() => {
    const f = async () => {
      getFollowedUid(following_uid);
      await getPosts(category, followedUid);
    };
    f();
  }, [query, setFollowedUid]);

  const getPosts = async (category: string, followedUid: any | string) => {
    let query = db.collection("posts").orderBy("createdAt", "desc");
    query = category !== "" ? query.where("category", "==", category) : query;
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
          category: data.category,
        });
      });

      setCurrentPost(posts);
    });
  };

  return (
    <div className="home-wrapper">
      <div className="home-aside">
        <h5 style={{ marginTop: "15px" }}>
          <LocalOfferIcon style={{ color: red[500] }} />
          &nbsp; Tags
        </h5>
        <Tags />
        <TimeLineLink />
      </div>
      <div className="home-cardWith">
        <div className="home-card-head">
          <h3>Posts</h3>
          <FeedSelector />
        </div>
        {currentPost.map((post: any) => (
          <Post
            key={post.id}
            authorName={post.authorName}
            content={post.content}
            createdAt={post.createdAt}
            title={post.title}
            id={post.id}
            uid={post.uid}
            category={post.category}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
