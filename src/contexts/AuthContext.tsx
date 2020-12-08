import React, { useContext, useState, useEffect, ReactNode } from "react";
import { auth, db, timestamp } from "../firebase";
import firebase from "../firebase";
import { useHistory, Redirect } from "react-router-dom";

interface Props {
  children: ReactNode | ReactNode[];
}

const AuthContext = React.createContext<Partial<Props>>({});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
  const [currentUser, setCurrentUser]: any = useState();
  const [currentPost, setCurrentPost] = useState([]);
  const [currentId, setCurrentId] = useState();
  const [defUsername, setDefUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  async function signup(username: any, email: any, password: any) {
    const result = await auth.createUserWithEmailAndPassword(email, password);
    console.log(result);
    const user = result.user;
    if (user) {
      const uid = user.uid;
      const userInitialData = {
        email: email,
        uid: uid,
        username: username,
      };

      db.collection("users").doc(uid).set(userInitialData);
      // .then("ユーザーが作成されました!");
    }
  }

  function login(email: any, password: any) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email: any) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateUser(username: any, email: any, data: any) {
    const uid = data.uid;
    return db
      .collection("users")
      .doc(uid)
      .set(
        {
          email: email,
          username: username,
        },
        { merge: true }
      )
      .then(() => console.log("success!!"));
  }

  function updatePassword(password: any) {
    return firebase.auth().currentUser?.updatePassword(password);
  }

  const createPost = (title: any, content: any, authorName: any, uid: any) => {
    // const enterToBr = content.replace(/\r?\n/g, '<br>');
    // const brToBreak = enterToBr.replace(/(<br>|<br \/>)/gi, '\r\n');
    db.collection("posts")
      .add({
        title: title,
        content: content,
        authorName: authorName,
        createdAt: timestamp,
        uid: uid,
      })
      .then((result: any) => {
        const id = result.id;
        console.log(result.id);
        db.collection("posts")
          .doc(id)
          .set({ id }, { merge: true })
          .then(() => {
            console.log("投稿成功！！");
            history.push("/");
          });
      });
  };

  const setNowId = (id: any) => {
    return setCurrentId(id);
  };

  const setNowPost = async (id: any) => {
    let post: any = [];
    await db
      .collection("posts")
      .doc(id)
      .get()
      .then((snapshot: any) => {
        const data = snapshot.data();
        post.push({
          title: data.title,
          content: data.content,
        });
      });
    setCurrentPost(post[0]);
  };

  const editPost = (title: any, content: any, data: any) => {
    const id = data.id;
    db.collection("posts")
      .doc(id)
      .set(
        {
          title: title,
          content: content,
        },
        { merge: true }
      )
      .then(() => {
        history.push("/");
        console.log("更新成功!");
      });
  };

  const savePostToBookmark = async (savedPosts: any) => {
    const uid = currentUser.uid;
    const saveRef = db
      .collection("users")
      .doc(uid)
      .collection("bookmarks")
      .doc();
    savedPosts["saveId"] = saveRef.id;
    await saveRef.set(savedPosts);
  };

  const removePostFromBookmark = async (id: any) => {
    const uid = currentUser.uid;
    await db
      .collection("users")
      .doc(uid)
      .collection("bookmarks")
      .doc(id)
      .delete();
  };

  const getCurrentUserName = (uid: any) => {
    db.collection("users")
      .doc(uid)
      .get()
      .then((snapshot: any) => {
        const data = snapshot.data();
        if (data.username !== "") {
          setDefUsername(data.username);
        }
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setCurrentUser(user);
      setLoading(false);
      if (user !== null) getCurrentUserName(user.uid);
      history.push("/");
    });
    return unsubscribe;
  }, [history]);

  const value: any = {
    currentUser,
    setCurrentUser,
    login,
    signup,
    logout,
    resetPassword,
    updatePassword,
    updateUser,
    createPost,
    editPost,
    setNowId,
    currentId,
    setNowPost,
    currentPost,
    savePostToBookmark,
    removePostFromBookmark,
    defUsername,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}