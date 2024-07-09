// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBUZJDLktz7qBHUPj_XtPybxz3vkz5cYlQ",
    authDomain: "seedlingsweb-b6e5e.firebaseapp.com",
    projectId: "seedlingsweb-b6e5e",
    storageBucket: "seedlingsweb-b6e5e.appspot.com",
    messagingSenderId: "1042431917002",
    appId: "1:1042431917002:web:ebea14cb0326379967ed33",
    measurementId: "G-JVWHZPDJX7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };

