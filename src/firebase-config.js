// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA3KYvJb3pXPneodkl7KfzmkbqI6GNOEA4",
    authDomain: "todo-react-bb804.firebaseapp.com",
    projectId: "todo-react-bb804",
    storageBucket: "todo-react-bb804.appspot.com",
    messagingSenderId: "799433828374",
    appId: "1:799433828374:web:df7fb8b73950e1ee5ded37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

