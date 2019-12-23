import firebase from 'firebase';

let database;
var firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

export const fire = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  database = firebase.database();
  firebase.analytics();
}

export const getFirebaseDB = () => {
  return database.ref('/').once('value');
}