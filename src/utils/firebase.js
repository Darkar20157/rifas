// src/utils/firebase.js
import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable } from "firebase/functions";

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "rifas-app-backend.firebaseapp.com",
  projectId: "rifas-app-backend",
};

const app = initializeApp(firebaseConfig);
export const functions = getFunctions(app);
export { httpsCallable };
