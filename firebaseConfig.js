import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // ✅ Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBv_ZD379btnkOpgmh5hfhSVPv3aL8DCqU",
  authDomain: "gamestudy-f0ecd.firebaseapp.com",
  projectId: "gamestudy-f0ecd",
  storageBucket: "gamestudy-f0ecd.firebasestorage.app",
  messagingSenderId: "441059387353",
  appId: "1:441059387353:web:45eb0359c72e6ab5b21bc8"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);  // ✅ add this