import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';

export const db = firebase.firestore;
export const auth = firebase.auth;

export const firebaseConfig = {
  apiKey: 'AIzaSyAB6ekauu_TGBvaW8HuyyAkZeFZq3dJbtQ',
  authDomain: 'webinar-wave.firebaseapp.com',
  projectId: 'webinar-wave',
  storageBucket: 'webinar-wave.appspot.com',
  messagingSenderId: '916186076518',
  appId: '1:916186076518:web:43a8651b13b69fd04924a7',
  measurementId: 'G-JK8FRY06DE',
};
//initialize firebase with above config
firebase.initializeApp(firebaseConfig);
export const functions = firebase.functions();

/****************** firestore refs ******************/
const users = db().collection('users');
const buildings = db().collection('buildings');
const config = db().collection('config');
/*****************************************/

export const refs = {
  users,
  config,
  buildings,
};

export const currUser = () => auth().currentUser;
export const serverTimestamp = () => db.FieldValue.serverTimestamp();

// const driver = (uid) => users.doc(uid).collection('profiles').doc('driver');
