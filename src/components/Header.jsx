import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import UserPhoto from './ui/UserPhoto';

export default function Header() {
  const { user, signIn, signOut } = useUserContext();

  return (
    <header className="sticky top-0 z-10 p-4 flex justify-between items-center bg-brand-dark text-white">
      <h1 className="p-1 font-bold text-lg">
        <Link to="/">Bookclub</Link>
      </h1>
      <nav>
        <ul className="flex gap-2 items-center">
          <li className="p-1 border-b border-transparent hover:text-brand-accent hover:border-brand-accent">
            <Link to="/">Home</Link>
          </li>
          {user && (
            <li className="p-1 border-b border-transparent hover:text-brand-accent hover:border-brand-accent">
              <Link to={'bookcase/' + user.uid}>My Bookcase</Link>
            </li>
          )}
          {user && user.isAdmin && (
            <li className="p-1 border-b border-transparent hover:text-brand-accent hover:border-brand-accent">
              <Link to="manage">Manage</Link>
            </li>
          )}
          <li className="p-1 border-b border-transparent hover:text-brand-accent hover:border-brand-accent">
            <button onClick={() => (user ? signOut() : signIn())}>
              {user ? 'Sign out' : 'Sign in'}
            </button>
          </li>
          <li className="shrink-0">
            <UserPhoto user={user} />
          </li>
        </ul>
      </nav>
    </header>
  );
}
