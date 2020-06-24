import firebase from 'firebase';

let database;
const firebaseConfig = {
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
  database = firebase.firestore();
}

export const getDeviceList = () => {
  return database.collection("devices").get();
}

export const getStaypointList = (deviceId) => {
  const deviceRef = database.collection("devices").doc(deviceId);
  return database.collection("staypoints").where("userId", "==", deviceRef).get();
}

export const setNewDevice = (id, name, uniqueId) => {
  database.collection("devices").doc(id.toString()).set({
    name: name,
    uniqueId: uniqueId.toString()
  }).catch((error) => {
    console.error(error);
  })
}

export const setNewStaypoint = (id, staypoint) => {
  const deviceRef = database.collection("devices").doc(id.toString());

  database.collection("staypoints").doc().set({
    name: "",
    content: "",
    date: new firebase.firestore.Timestamp.fromDate(new Date(staypoint.date)),
    coordinate: new firebase.firestore.GeoPoint(staypoint.coordinate.latitude, staypoint.coordinate.longitude),
    isShared: false,
    userId: deviceRef
  }).catch((error) => {
    console.log(error);
  });
}