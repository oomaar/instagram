import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// import seed file
// import { seedDatabase } from "../seed";

const config = {
    apiKey: "AIzaSyCaHHf7qgfu5klajL3GTb0h8diQkmJSFNM",
    authDomain: "instagram-5c2cd.firebaseapp.com",
    projectId: "instagram-5c2cd",
    storageBucket: "instagram-5c2cd.appspot.com",
    messagingSenderId: "1015984926961",
    appId: "1:1015984926961:web:79e8c3ccd0097cc1083950"
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// call seed file (Only Once!)
// seedDatabase(firebase);

export {
    firebase,
    FieldValue,
};