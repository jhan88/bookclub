import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser, userSignIn, userSignOut } from '../api/firebase';

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser((user) => {
      if (user) {
        const { email, displayName, photoURL, uid } = user;
        setUser({ email, displayName, photoURL, uid });
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <header className="p-4 flex justify-between items-center bg-brand-dark text-white">
      <h1 className="p-1 font-bold text-lg">
        <Link to="/">Bookclub</Link>
      </h1>
      <nav>
        <ul className="flex gap-2 items-center">
          <li className="p-1 border-b border-transparent hover:text-brand-accent hover:border-brand-accent">
            <Link to="/">Home</Link>
          </li>
          <li className="p-1 border-b border-transparent hover:text-brand-accent hover:border-brand-accent">
            <Link to={`bookcase/:uid`}>My Bookcase</Link>
          </li>
          <li className="p-1 border-b border-transparent hover:text-brand-accent hover:border-brand-accent">
            <Link to="manage">Manage</Link>
          </li>
          <li className="p-1 border-b border-transparent hover:text-brand-accent hover:border-brand-accent">
            <button onClick={() => (user ? userSignOut() : userSignIn())}>
              {user ? 'Sign out' : 'Sign in'}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
