import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCwV08mSHFNO026u5DaclhxOJnnTDLNKm8",
  authDomain: "covid-19-e5199.firebaseapp.com",
  projectId: "covid-19-e5199",
  storageBucket: "covid-19-e5199.appspot.com",
  messagingSenderId: "376651224303",
  appId: "1:376651224303:web:a241bb13d0745c7811f71a",
  measurementId: "G-MFTW4KFQEN",
});
const db = firebaseApp.firestore();
export { db };
