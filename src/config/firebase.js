import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB-9jQf9_bMcl480pXd-JUmMRg0ATdIlvk",
  authDomain: "projeto-mobile-15b91.firebaseapp.com",
  databaseURL: "https://projeto-mobile-15b91.firebaseio.com",
  projectId: "projeto-mobile-15b91",
  storageBucket: "projeto-mobile-15b91.appspot.com",
  messagingSenderId: "530871462276",
  appId: "1:530871462276:web:65147a9df73cdb5b9755d1",
  measurementId: "G-5DQE6JBVBE"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);
const auth = app.auth();

export { app, db, auth };
