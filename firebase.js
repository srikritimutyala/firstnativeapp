// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD4--1UxMlaPmIg46JXOPqBZ2JrWy2VFrI",
    authDomain: "testexample-a77ca.firebaseapp.com",
    projectId: "testexample-a77ca",
    storageBucket: "testexample-a77ca.appspot.com",
    messagingSenderId: "660342296825",
    appId: "1:660342296825:web:c974458e9d4dd12c14d228",
    measurementId: "G-RCMJPT50M0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db}