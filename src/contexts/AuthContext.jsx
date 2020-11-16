import React, { useContext, useState, useEffect } from "react"
import { auth, db } from "../firebase"
import firebase from "../firebase"
import { useHistory } from "react-router-dom"

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

  const createPost = (title, content, authorName) => {
    db.collection('posts').add({
      title: title,
      content: content,
      authorName: authorName,
      createdAt: new Date()
    })
  }

  const setNowId = id => {
    return setCurrentId(id)
  }

  const setNowPost = async(id) => {
    let post = [];
    await  db.collection('posts').doc(id).get()
    .then(snapshot => {
      const data = snapshot.data()
      post.push({
        title: data.title,
        content: data.content
      })
    })
    setCurrentPost(post[0])
  }

  const editPost = (title, content, authorName) => {
    db.collection('posts').set({
      title: title,
      content: content,
      authorName: authorName,
      updatedAt: new Date()
    }, { merge: true })
    .then("更新成功!")
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async(user) => {
      if (user) {
        const uid = user.uid
        await db.collection('users').doc(uid).get()
          .then(snapshot => {
            const data = snapshot.data()
            setCurrentUser(data)
            setLoading(false)
          })
      }
    })
    
    return unsubscribe
  }, [])

  const value = {
    currentUser,
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
    currentPost
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

//コンポーネントが表示されなくなったら、loadingの!を外してログイン→!つけて再度ログイン