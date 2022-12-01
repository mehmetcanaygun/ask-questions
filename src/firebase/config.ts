import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAW0FKE9Rrx_neZWHywA9hwyLLeghacXYQ",
  authDomain: "ask-questions-66ab9.firebaseapp.com",
  projectId: "ask-questions-66ab9",
  storageBucket: "ask-questions-66ab9.appspot.com",
  messagingSenderId: "416999999185",
  appId: "1:416999999185:web:566c31e04c1d025fe367f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db }
