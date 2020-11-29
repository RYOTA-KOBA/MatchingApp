import React, { useContext, useState, useEffect } from "react"
import { auth, db, timestamp } from "../firebase"
import firebase from "../firebase"
import { useHistory, Redirect } from "react-router-dom"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [currentPost, setCurrentPost] = useState([])
  const [currentId, setCurrentId] = useState()
  const [loading, setLoading] = useState(true)
  const history = useHistory()

  async function signup(username, email, password) {
    const result = await auth.createUserWithEmailAndPassword(email, password)
    console.log(result)
    const user = result.user
    if (user) {
      const uid = user.uid
      const userInitialData = {
        email: email,
        uid: uid,
        username: username
      }

      db.collection('users').doc(uid).set(userInitialData)
        .then('ユーザーが作成されました!')
    }
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }


  function updateUser(username, email, data) {
    const uid = data.uid
    return db.collection('users').doc(uid).set({
      email: email,
      username: username,
    }, { merge: true })
    .then(() => console.log("success!!"))
}


  function updatePassword(password) {
    return firebase.auth().currentUser.updatePassword(password)
  }

  const createPost = (title, content, authorName, uid) => {
    // const enterToBr = content.replace(/\r?\n/g, '<br>');
    // const brToBreak = enterToBr.replace(/(<br>|<br \/>)/gi, '\r\n');
    db.collection('posts').add({
      title: title,
      content: content,
      authorName: authorName,
      createdAt: timestamp,
      uid: uid,
    })
    .then(result => {
      const id = result.id
      console.log(result.id)
      db.collection('posts').doc(id).set({id}, {merge: true})
      .then(() => {
        console.log("投稿成功！！")
        history.push("/")
      })
    })
  }

  const setNowId = id => {
    return setCurrentId(id)
  }

  const setNowPost = async(id) => {
    let post = [];
    await db.collection('posts').doc(id).get()
    .then(snapshot => {
      const data = snapshot.data()
      post.push({
        title: data.title,
        content: data.content
      })
    })
    setCurrentPost(post[0])
  }

  const editPost = (title, content, data) => {
    const id = data.id
    db.collection('posts').doc(id).set({
      title: title,
      content: content
    }, { merge: true })
    .then(() => {
      history.push('/')
      console.log("更新成功!")
    })
  }

  const savePostToBookmark = async(savedPosts) => {
    const uid = currentUser.uid
    const saveRef = db.collection('users').doc(uid).collection('bookmarks').doc();
    savedPosts['saveId'] = saveRef.id;
    await saveRef.set(savedPosts);
  }

  const removePostFromBookmark = async (id) => {
    const uid = currentUser.uid
    await db.collection('users').doc(uid)
        .collection('bookmarks').doc(id)
        .delete();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
      history.push("/")
    })
    return unsubscribe
  }, [])

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
    removePostFromBookmark
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

//コンポーネントが表示されなくなったら、loadingの!を外してログイン→!つけて再度ログイン