// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCX0siZMyDPZj44JREv0uT0kY6KkvdyXBg",
  authDomain: "interviewer-45ddd.firebaseapp.com",
  projectId: "interviewer-45ddd",
  storageBucket: "interviewer-45ddd.firebasestorage.app",
  messagingSenderId: "646683412455",
  appId: "1:646683412455:web:6e275183935c9f201b1f42",
  measurementId: "G-WC09JFD43P"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp()

export const auth = getAuth(app)
export const db = getFirestore(app)