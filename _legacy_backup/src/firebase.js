// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJ1S3FBw9GIzGaSU616DmH3zKyjLNvKfQ",
  authDomain: "coderafroj-18d0c.firebaseapp.com",
  projectId: "coderafroj-18d0c",
  storageBucket: "coderafroj-18d0c.firebasestorage.app",
  messagingSenderId: "1008097145690",
  appId: "1:1008097145690:web:0d90de551a76a88a54f963",
  measurementId: "G-QBPQB2T57Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage };
