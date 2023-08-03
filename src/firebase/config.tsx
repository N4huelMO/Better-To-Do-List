// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1eCiVlAbAeCwYBNbpZl5-vbPjm8yWCxg",
  authDomain: "better-to-do-9b13d.firebaseapp.com",
  projectId: "better-to-do-9b13d",
  storageBucket: "better-to-do-9b13d.appspot.com",
  messagingSenderId: "229046604211",
  appId: "1:229046604211:web:e714e3e4e9de04ad483bc6",
  measurementId: "G-CQDN1TECZD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const db = getFirestore(app);

export const provider = new GoogleAuthProvider();
