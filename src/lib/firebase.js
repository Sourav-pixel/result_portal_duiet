import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDGDOvEKtt4ZAKqiT0aQq6vQauG8Q6QeGY",
  authDomain: "duiet-web-portal.firebaseapp.com",
  projectId: "duiet-web-portal",
  storageBucket: "duiet-web-portal.firebasestorage.app",
  messagingSenderId: "775376850693",
  appId: "1:775376850693:web:7aedc8775a0d50e826716c",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
