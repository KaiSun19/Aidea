import { DoorBack } from '@mui/icons-material';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseApp = firebase.initializeApp({

    apiKey: "AIzaSyD-ofGvMQIi4SoveD0Jpo5BcAsfj5-Hl9c",
    authDomain: "aidea-13e1e.firebaseapp.com",
    projectId: "aidea-13e1e",
    storageBucket: "aidea-13e1e.appspot.com",
    messagingSenderId: "620548776827",
    appId: "1:620548776827:web:ec77fe158edd473da693de",
    measurementId: "G-B5Y8KJ52HJ"

});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth , storage}