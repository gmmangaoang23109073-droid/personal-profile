// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "personal-profile-e9013.firebaseapp.com",
  projectId: "personal-profile-e9013",
  storageBucket: "personal-profile-e9013.firebasestorage.app",
  messagingSenderId: "320142513932",
  appId: "1:320142513932:web:23979b3b0226a1d9f79b29",
  measurementId: "G-E5TJ7J4P86"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export database
export { db, collection, addDoc };