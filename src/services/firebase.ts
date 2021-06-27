import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAXdCdDdICRleHiYxVloIX5IC86szgAv7A",
  authDomain: "letmeask-833f6.firebaseapp.com",
  projectId: "letmeask-833f6",
  storageBucket: "letmeask-833f6.appspot.com",
  messagingSenderId: "196613470048",
  appId: "1:196613470048:web:d34d19b12245581a109005"
};


firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database(); // Acesso a API de banco de dados do Firebase

export { firebase, auth, database };