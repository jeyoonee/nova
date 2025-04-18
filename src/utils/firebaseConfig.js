import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBL-UJEIPfUKjNQysJUqoC_woSI0CPu4Nw",
  authDomain: "shoppy-828b2.firebaseapp.com",
  databaseURL:
    "https://shoppy-828b2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "shoppy-828b2",
  storageBucket: "shoppy-828b2.firebasestorage.app",
  messagingSenderId: "426903921607",
  appId: "1:426903921607:web:d5b9ca445fc1c86d122fe2",
  measurementId: "G-LXX9H9N97J",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
