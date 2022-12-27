import { useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCN9MvK0WIGuonNidxth46oVWK1I_7Amc8",
  authDomain: "bibliotech-v4.firebaseapp.com",
  projectId: "bibliotech-v4",
  storageBucket: "bibliotech-v4.appspot.com",
  messagingSenderId: "468453351524",
  appId: "1:468453351524:web:88b8a4e4c7466880563f71",
  measurementId: "G-QGGCPYXDWB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Custom Hook
export function useAuth() {
  const [currenteUser, setCurrenteUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrenteUser(user));
    return unsub;
  }, [])

  return currenteUser;
}

// Storage
const spaceRef = ref(storage, 'user/');

export async function upload(file, currenteUser, setLoading) {
  const fileRef = ref(storage, currenteUser.uid + '.png');

  setLoading(true);
  
  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currenteUser, {photoURL});
  
  setLoading(false);
  alert("Uploaded file!");
}
