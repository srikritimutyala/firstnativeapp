// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIUYBYVfX_KgKIorkez0Kyu5_Y0HqpTDA",
  authDomain: "tripplanner-383c2.firebaseapp.com",
  projectId: "tripplanner-383c2",
  storageBucket: "tripplanner-383c2.appspot.com",
  messagingSenderId: "333813161508",
  appId: "1:333813161508:web:f9905e98d692ea833d82b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
//982631072066-m5lh3p8rv2djnhg9qcms7v3rmemu4bpv.apps.googleusercontent.com 
