import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_QLYbLof_GseeszKjMjJdi7CVfq14HeM",
  authDomain: "pawfinder-8dc12.firebaseapp.com",
  projectId: "pawfinder-8dc12",
  storageBucket: "pawfinder-8dc12.firebasestorage.app",
  messagingSenderId: "426334595260",
  appId: "1:426334595260:web:84e95c1b7261d906dec8b9"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);