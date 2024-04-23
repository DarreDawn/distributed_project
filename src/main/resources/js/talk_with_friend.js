// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, query, where, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDLHUMYvjs2zDyKMYNcEdIKd_6V3i9EKzc",
    authDomain: "distributed-project-32dc4.firebaseapp.com",
    projectId: "distributed-project-32dc4",
    storageBucket: "distributed-project-32dc4.appspot.com",
    messagingSenderId: "368318225640",
    appId: "1:368318225640:web:b5d6054a9ca63ddfbfbd5d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//get ref to database services
const db = getFirestore(app);

