// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKSyiznkXdxM9JaHYBJoXErnQsKYN6Hrk",
  authDomain: "capellorentingapp.firebaseapp.com",
  projectId: "capellorentingapp",
  storageBucket: "capellorentingapp.appspot.com",
  messagingSenderId: "655459220032",
  appId: "1:655459220032:web:6c637312c2adf325107da5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export default app;

