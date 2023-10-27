// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2Elb4yt7RSfAujeu1eJ75A_FDo5qomg8",
  authDomain: "foodapp-3ba8e.firebaseapp.com",
  databaseURL: "https://foodapp-3ba8e-default-rtdb.firebaseio.com",
  projectId: "foodapp-3ba8e",
  storageBucket: "foodapp-3ba8e.appspot.com",
  messagingSenderId: "499092830091",
  appId: "1:499092830091:web:0974c669b9d8930298e18e",
  measurementId: "G-3BMKNTYJ8T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export { app, analytics, database };