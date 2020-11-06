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


  //リダイレクトされた時は編集前の値のまま。先にリダイレクトされてる？？
  function updateUser(username, email, data) {
    const uid = data.uid
    db.collection('users').doc(uid).set({
      email: email,
      username: username,
    }, {merge: true})
    .then(console.log("更新が成功しました"))
  }


  function updatePassword(password) {
    return firebase.auth().currentUser.updatePassword(password)
  }


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const uid = user.uid
        
        db.collection('users').doc(uid).get()
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
    updateUser
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}