import React, { useContext, useState, useEffect } from "react"
import { auth, db } from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(username, email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
      .then(result => {
        const user = result.user

        if(user) {
          const uid = user.uid
          const userInitialData = {
            email: email,
            uid: uid,
            username: username
          }

          db.collection('users').doc(uid).set(userInitialData)
            .then('ユーザーが作成されました!')
        }
      })
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

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
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
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
