import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB5PwoL-ikqeJ-ihdN7I79Uu0UsYEaAowQ",
    authDomain: "toystore-d5bc5.firebaseapp.com",
    databaseURL: "https://toystore-d5bc5-default-rtdb.firebaseio.com",
    projectId: "toystore-d5bc5",
    storageBucket: "toystore-d5bc5.appspot.com",
    messagingSenderId: "809842259786",
    appId: "1:809842259786:web:90939a8aafe7d08f0673b3"
  };
  
const app = getApps.Length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

  export {app, firestore, storage};