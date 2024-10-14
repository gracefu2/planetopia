// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCTMjQRM3TxNkrvCZF7mfhlzLgIM2UTSc",
  authDomain: "planetopia-app.firebaseapp.com",
  projectId: "planetopia-app",
  storageBucket: "planetopia-app.appspot.com",
  messagingSenderId: "891178845365",
  appId: "1:891178845365:web:f037043e974c284883eafc"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app