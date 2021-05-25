import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';


const config = {
  apiKey: "AIzaSyAtw-PXhJQmGYix-Md8oChT8p-KFPXVWrM",
  authDomain: "instagram-clone016.firebaseapp.com",
  databaseURL: "https://instagram-clone016-default-rtdb.firebaseio.com",
  projectId: "instagram-clone016",
  storageBucket: "instagram-clone016.appspot.com",
  messagingSenderId: "403015998484",
  appId: "1:403015998484:web:1f9a94ad72dc3a4b875b01",
  measurementId: "G-BC6QD9J6B3"


};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;
const db = firebase.firestore();
const storage = firebase.storage();


export { firebase, FieldValue, db, storage};
