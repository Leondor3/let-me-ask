import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCV6aeYIMi3Ri_hWYjMOJtzIsYavfHgSoE",
  authDomain: "letmeask-adb4d.firebaseapp.com",
  databaseURL: "https://letmeask-adb4d-default-rtdb.firebaseio.com",
  projectId: "letmeask-adb4d",
  storageBucket: "letmeask-adb4d.appspot.com",
  messagingSenderId: "1017939946757",
  appId: "1:1017939946757:web:cd1ecb5e6cf870c52c9b6c"
};

firebase.initializeApp(firebaseConfig);

 const auth = firebase.auth();
 const database = firebase.database();
 
 export { firebase, auth, database}
