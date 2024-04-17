// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
   authDomain: 'mern-blog-26021.firebaseapp.com',
   projectId: 'mern-blog-26021',
   storageBucket: 'mern-blog-26021.appspot.com',
   messagingSenderId: '1062523807597',
   appId: '1:1062523807597:web:822102dc54d04a33971c64',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
