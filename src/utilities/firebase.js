// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaxUPbJzgdPoIuS5NCvZihONl2546igOs",
  authDomain: "flowee-shop.firebaseapp.com",
  projectId: "flowee-shop",
  storageBucket: "flowee-shop.appspot.com",
  messagingSenderId: "870041392112",
  appId: "1:870041392112:web:3277ea515956bc3c1d0335",
  measurementId: "G-C5GFBRB12P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
