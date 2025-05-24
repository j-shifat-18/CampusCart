import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../Firebase/firebase.config";



export const AuthContext = createContext();

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

    console.log(user)

  const googleLogin = ()=>{
    return signInWithPopup(auth,provider);
  }

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUserInfo = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  const logOutUser = ()=>{
    return signOut(auth);
  }

  const resetPassword = (email)=>{
    return sendPasswordResetEmail(auth , email)
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const authData = {
    user,
    setUser,
    createUser,
    loginUser,
    updateUserInfo,
    loading,
    setLoading,
    logOutUser,
    googleLogin,
    resetPassword,

  };

  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
