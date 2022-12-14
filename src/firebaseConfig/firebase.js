import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDzFIK6iezMNspez7qTWtSS9VAaLiIY9R4",
  authDomain: "libreta-contactos-8f106.firebaseapp.com",
  projectId: "libreta-contactos-8f106",
  storageBucket: "libreta-contactos-8f106.appspot.com",
  messagingSenderId: "1069743889781",
  appId: "1:1069743889781:web:d251e2c766e320b42c873c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
