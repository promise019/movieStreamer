
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
  import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
  import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
 
  const firebaseConfig = {
    apiKey: "AIzaSyCqEtd6bGVUU-JFRp33s4_XQq92Qznt9ng",
    authDomain: "moviestreamer-9f918.firebaseapp.com",
    projectId: "moviestreamer-9f918",
    storageBucket: "moviestreamer-9f918.firebasestorage.app",
    messagingSenderId: "208583991212",
    appId: "1:208583991212:web:5d1a0a98cf637d2120e409",
    measurementId: "G-D0Z31LBZ6P"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  const auth = getAuth();
  const db= getFirestore();

  export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };