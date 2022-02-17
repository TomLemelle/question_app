import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";

// If you're not using Code Sandbox, never hard-code the keys! Add them in your .env file and link them here
const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyA5sQrZl0i5UB4EAki9r1W_9X24SMkImnY",
  authDomain: "upload-video-quizz.firebaseapp.com",
  projectId: "upload-video-quizz",
  storageBucket: "upload-video-quizz.appspot.com",
  messagingSenderId: "874185117380",
  appId: "1:874185117380:web:380a45af4f5c70cbc78391",
});
// Initialize Firebase
const db = firebaseConfig.firestore();
const storage = firebaseConfig.storage();

export { db, storage };
