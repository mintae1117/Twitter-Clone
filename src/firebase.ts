// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCe_EbhtkwD9OnWHYOE8NzvS4w32TcFiQ",
  authDomain: "twitter-clone-73087.firebaseapp.com",
  projectId: "twitter-clone-73087",
  storageBucket: "twitter-clone-73087.appspot.com",
  messagingSenderId: "395291291373",
  appId: "1:395291291373:web:1342c70e40a0ccb27da6e4",
  measurementId: "G-9ESWBPWD0T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
