import React, { useContext, useState, useEffect } from "react";
// @ts-expect-error ts-migrate(6142) FIXME: Module '../firebase' was resolved to '/Users/ryota... Remove this comment to see the full error message
import { auth, db, timestamp } from "../firebase";
// @ts-expect-error ts-migrate(6142) FIXME: Module '../firebase' was resolved to '/Users/ryota... Remove this comment to see the full error message
import firebase from "../firebase";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { useHistory, Redirect } from "react-router-dom";

// @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({
  children
}: any) {
  const [currentUser, setCurrentUser] = useState();
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

      db.collection("users")
        .doc(uid)
        .set(userInitialData)
        .then("ユーザーが作成されました!");
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
    return firebase.auth().currentUser.updatePassword(password);
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
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
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
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
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

  const value = {
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
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

//コンポーネントが表示されなくなったら、loadingの!を外してログイン→!つけて再度ログイン
