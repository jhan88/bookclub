import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_apiKey,
  authDomain: process.env.REACT_APP_FIREBASE_authDomain,
  databaseURL: process.env.REACT_APP_FIREBASE_databaseURL,
  projectId: process.env.REACT_APP_FIREBASE_projectId,
  appId: process.env.REACT_APP_FIREBASE_appId,
};

const app = initializeApp(firebaseConfig);
