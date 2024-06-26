import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  get,
  getDatabase,
  onValue,
  ref,
  remove,
  set,
  update,
} from 'firebase/database';

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
  return await isRegistered(book.id)
    .then((result) => {
      return result
        ? 'Already registered'
        : set(ref(database, 'inventory/' + book.id), book).then(() => {
            return 'Success!';
          });
    })
    .catch((error) => error.message);
}

export async function deleteBook(id) {
  return await remove(ref(database, 'inventory/' + id));
}

export async function getBookReviews(bookId) {
  return await get(ref(database, 'reviews/' + bookId)).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return {};
    }
  });
}

export async function getUserReviewIds(uid) {
  return await get(ref(database, 'users/' + uid + '/reviews')).then(
    (snapshot) => {
      return snapshot.exists() ? snapshot.val() : {};
    }
  );
}

export async function isReviewed(uid, bookId, callback) {
  onValue(ref(database, 'users/' + uid + '/reviews/' + bookId), (snapshot) => {
    callback(snapshot.exists());
  });
}

export async function submitReview(user, bookId, contents, isEditing = false) {
  const { uid, photoURL, displayName } = user;
  const reviewId = uid + '-review-' + bookId;
  const timestamp = Date.now();

  try {
    if (isEditing) {
      await update(ref(database, 'reviews/' + bookId + '/' + reviewId), {
        lastEditedAt: timestamp,
        contents: contents,
      });
    } else {
      await set(ref(database, 'reviews/' + bookId + '/' + reviewId), {
        reviewer: { uid, photoURL, displayName },
        createdAt: timestamp,
        contents,
      });
      await set(
        ref(database, 'users/' + user.uid + '/reviews/' + bookId),
        reviewId
      );
    }
  } catch (error) {
    return error.message;
  }
  return 'Success!';
}

export async function deleteReview(uid, bookId, reviewId) {
  try {
    await remove(ref(database, 'reviews/' + bookId + '/' + reviewId));
    await remove(ref(database, 'users/' + uid + '/reviews/' + bookId));
  } catch (error) {
    return error.message;
  }
  return 'Success!';
}
