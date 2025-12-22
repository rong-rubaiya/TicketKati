import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { 
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile as firebaseUpdateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '../firebase/firebase.config';

const googleProvider = new GoogleAuthProvider();
const fbProvider = new FacebookAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading, setLoading] = useState(true);

  // Extra profile info (optional)
  const [extraProfile, setExtraProfile] = useState(() => {
    const saved = localStorage.getItem("extraProfile");
    return saved ? JSON.parse(saved) : {};
  });

  

  const updateExtraProfile = (data) => {
    const updated = { ...extraProfile, ...data };
    setExtraProfile(updated);
    localStorage.setItem("extraProfile", JSON.stringify(updated));
  };

  // Create user with email/password
  const createUser = async (email, password) => {
    setLoading(true);
    const res = await createUserWithEmailAndPassword(auth, email, password);
    setLoading(false);
    return res.user;
  };

  // Update Firebase profile
  const updateUserProfile = (name, photoURL) => {
    if (!auth.currentUser) return;
    return firebaseUpdateProfile(auth.currentUser, { displayName: name, photoURL });
  };

  // Sign in with email/password and fetch role
  const signInUser = async (email, password) => {
    setLoading(true);
    const res = await signInWithEmailAndPassword(auth, email, password);

    // Fetch role from backend
    const roleRes = await fetch(`https://ticketkati.vercel.app/user-role/${email}`);
    const roleData = await roleRes.json(); // { role: 'user' | 'vendor' | 'admin' }

    const loggedUser = {
      uid: res.user.uid,
      email: res.user.email,
      displayName: res.user.displayName,
      photoURL: res.user.photoURL,
      role: roleData.role,
      ...extraProfile
    };

    setUser(loggedUser);
    setLoading(false);
    return loggedUser;
  };

  // Google login
  const signInWithGoogle = async () => {
    setLoading(true);
    const res = await signInWithPopup(auth, googleProvider);

    // Fetch role from backend
    const email = res.user.email;
    const roleRes = await fetch(`https://ticketkati.vercel.app/user-role/${email}`);
    const roleData = await roleRes.json();

    const loggedUser = {
      uid: res.user.uid,
      email: res.user.email,
      displayName: res.user.displayName,
      photoURL: res.user.photoURL,
      role: roleData.role,
      ...extraProfile
    };

    setUser(loggedUser);
    setLoading(false);
    return loggedUser;
  };

  // Facebook login
  const facebookLogin = async () => {
    setLoading(true);
    const res = await signInWithPopup(auth, fbProvider);

    const email = res.user.email;
    const roleRes = await fetch(`https://ticketkati.vercel.app/user-role/${email}`);
    const roleData = await roleRes.json();

    const loggedUser = {
      uid: res.user.uid,
      email: res.user.email,
      displayName: res.user.displayName,
      photoURL: res.user.photoURL,
      role: roleData.role,
      ...extraProfile
    };

    setUser(loggedUser);
    setLoading(false);
    return loggedUser;
  };

  // Reset password
  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  // Logout
  const signOutUser = async () => {
    setLoading(true);
    await signOut(auth);
    setUser(null);
    setLoading(false);
  };

  // Listen to auth state changes
  useEffect(() => {
  // Check localStorage first
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    setUser(JSON.parse(savedUser));
    setLoading(false);
    return;
  }

  // Then check Firebase auth state
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      try {
        const roleRes = await fetch(`https://ticketkati.vercel.app/user-role/${currentUser.email}`);
        const roleData = await roleRes.json();

        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
          role: roleData.role,
          ...extraProfile
        });
      } catch (err) {
        console.error("Failed to fetch user role:", err);
        setUser({ ...currentUser, role: "user" }); // fallback
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  });

  return () => unsubscribe();
}, [extraProfile]);

  const authInfo = {
    createUser,
    updateUserProfile,
    signInUser,
    signInWithGoogle,
    facebookLogin,
    resetPassword,
    signOutUser,
    updateExtraProfile,
    user,
    loading,
    setUser
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
