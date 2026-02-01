import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // ✅ Firestore

const firebaseConfig = {
  apiKey: "AIzaSyBewCXwJMozcF9kmylFMYYdUhl0f-kWutY",
  authDomain: "smartbrgy-3a8bd.firebaseapp.com",
  projectId: "smartbrgy-3a8bd",
  storageBucket: "smartbrgy-3a8bd.firebasestorage.app",
  messagingSenderId: "965526864145",
  appId: "1:965526864145:web:21186856370f5d911bccb0"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);  // ✅ add this