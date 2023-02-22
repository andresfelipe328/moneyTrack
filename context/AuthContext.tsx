import React, {createContext, useContext, useEffect, useState} from 'react'
import {onAuthStateChanged, 
   createUserWithEmailAndPassword, 
   signInWithEmailAndPassword, 
   signOut, 
   updateProfile} from 'firebase/auth'
import {auth, db, storage} from '../config/firebase'
import nookies, { destroyCookie, parseCookies } from 'nookies'
import {doc, getDoc, setDoc, updateDoc, serverTimestamp} from 'firebase/firestore';

const AuthContext = createContext<any>({})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({children}: {children: React.ReactNode}) => {

   const [user, setUser] = useState({} || null)
   const [loading, setLoading] = useState(false)

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
         if (user) {
            setUser({
               username: user.email!.substring(0, user.email!.indexOf("@")),
               email: user.email,
               userID: user.uid
            })
            const token = await user.getIdToken();
            nookies.set(undefined, 'token', token, { path: '/' })
         }
         else {
            setUser(null)
            nookies.set(undefined, 'token', '', { path: '/' })
            // destroyCookie(undefined, 'token')
         }
         
         setLoading(false)
      })

      return () => unsubscribe()
   }, [])

   const signup = async (email: string, password: string) => {
      const data = await createUserWithEmailAndPassword(auth, email, password)
      try {
         await setDoc(doc(db, 'users', data.user.uid), {
            username: data.user.email!.substring(0, data.user.email!.indexOf("@")),
            email: data.user.email,
            userID: data.user.uid
         })
      } catch(err) {
         console.log('Signup:', err)
      }

      return data
   }

   const login = (email: string, password: string) => {
      return signInWithEmailAndPassword(auth, email, password)
   }

   const logout = async () => {
      setUser(null)
      await signOut(auth)
   }

   return (
      <AuthContext.Provider value={{user, signup, login, logout}}>
         {loading ? null : children}
      </AuthContext.Provider>
   )
}