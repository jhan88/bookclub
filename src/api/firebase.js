import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { get, getDatabase, ref, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_apiKey,
  authDomain: process.env.REACT_APP_FIREBASE_authDomain,
  databaseURL: process.env.REACT_APP_FIREBASE_databaseURL,
  projectId: process.env.REACT_APP_FIREBASE_projectId,
  appId: process.env.REACT_APP_FIREBASE_appId,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export async function userSignIn() {
  return signInWithPopup(auth, googleProvider);
}

export async function userSignOut() {
  return signOut(auth);
}

export async function getUser(callback) {
  return onAuthStateChanged(auth, callback);
}

const database = getDatabase(app);

export async function readInventory(id) {
  return await get(ref(database, 'inventory/' + (id ? id : ''))).then(
    (snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return {};
      }
    }
  );
}

export async function isRegistered(id) {
  return await readInventory(id).then((data) => Object.keys(data).length > 0);
}

export async function registerBook(book) {
  return await isRegistered(book.id).then((result) => {
    return result
      ? 'Already registered'
      : set(ref(database, 'inventory/' + book.id), book).then(() => {
          return 'Success!';
        });
  });
}
