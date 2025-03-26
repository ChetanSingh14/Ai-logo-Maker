// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "process.env.NEXT_PUBLIC_FIREBASE_API_KEY",
  authDomain: "ai-logo-maker-5275e.firebaseapp.com",
  projectId: "ai-logo-maker-5275e",
  storageBucket: "ai-logo-maker-5275e.firebasestorage.app",
  messagingSenderId: "667405785208",
  appId: "1:667405785208:web:a71a37ab114eedb7d0358d",
  measurementId: "G-SD1GENB0LC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
export { db };