// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBtwgb1sztIU-gDbfaRetCzQ9TKqnggZCA",
  authDomain: "connectopia-b2e6d.firebaseapp.com",
  projectId: "connectopia-b2e6d",
  storageBucket: "connectopia-b2e6d.appspot.com",
  messagingSenderId: "236738287244",
  appId: "1:236738287244:web:5e8ad3c58b067ed5998da9",
  measurementId: "G-0R69DS4178"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);