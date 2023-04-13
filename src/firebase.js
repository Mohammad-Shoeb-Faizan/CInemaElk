import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCJo0MkWchkHgXIY0SoJ-lBsC5r-UJM1yU",
  authDomain: "cinema-elk-d003c.firebaseapp.com",
  projectId: "cinema-elk-d003c",
  storageBucket: "cinema-elk-d003c.appspot.com",
  messagingSenderId: "86288383529",
  appId: "1:86288383529:web:700752b46a4639d302a638"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;