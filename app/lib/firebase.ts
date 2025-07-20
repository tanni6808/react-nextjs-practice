// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyB9A5PS5dpq9270pHTyR4p7oaS-_5y6Myk",
  authDomain: "react-nextjs-practice-4ca03.firebaseapp.com",
  projectId: "react-nextjs-practice-4ca03",
  storageBucket: "react-nextjs-practice-4ca03.firebasestorage.app",
  messagingSenderId: "540402695769",
  appId: "1:540402695769:web:a2b29bb5f0a102e9157b48",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
