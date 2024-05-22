import { createContext, useContext, useEffect, useState } from 'react';
import { getUser, userSignIn, userSignOut } from '../api/firebase';

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser((user) => {
      if (user) {
        const { email, displayName, photoURL, uid } = user;
        const isAdmin = uid === process.env.REACT_APP_FIREBASE_adminUid;
        setUser({ email, displayName, photoURL, uid, isAdmin });
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <UserContext.Provider
      value={{ user, signIn: userSignIn, signOut: userSignOut }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
