// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-estate-8cb83.firebaseapp.com",
    projectId: "mern-estate-8cb83",
    storageBucket: "mern-estate-8cb83.appspot.com",
    messagingSenderId: "786609201043",
    appId: "1:786609201043:web:e6fc7409ef8d021afcd266"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);