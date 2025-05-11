
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY ,
  authDomain: "chatapp1-84689.firebaseapp.com",
  projectId: "chatapp1-84689",
  storageBucket: "chatapp1-84689.firebasestorage.app",
  messagingSenderId: "110246671524",
  appId: "1:110246671524:web:41a6b89cbe4148132f6231",
  measurementId: "G-271P5B4GR4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);