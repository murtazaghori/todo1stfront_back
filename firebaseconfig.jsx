
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDieV1ytoj3HO2uCytl2pbwT4LbT763cLY",
    authDomain: "todo-b8c7b.firebaseapp.com",
    projectId: "todo-b8c7b",
    storageBucket: "todo-b8c7b.firebasestorage.app",
    messagingSenderId: "872928997088",
    appId: "1:872928997088:web:2268dfcd13252572c82a85"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
