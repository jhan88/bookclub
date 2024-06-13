import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import Nav from './Nav';
import UserPhoto from './ui/UserPhoto';

export default function Header() {
  const { user, signIn, signOut } = useUserContext();

  return (
    <header className="sticky top-0 p-4 z-10 flex gap-2 justify-between items-center bg-brand-dark text-white">
      <h1 className="font-bold text-lg basis-full">
        <Link to="/">Bookclub</Link>
      </h1>
      <Nav user={user} />
      <button
        onClick={() => (user ? signOut() : signIn())}
        className="shrink-0"
      >
        {user ? 'Sign out' : 'Sign in'}
      </button>
      <UserPhoto user={user} />
    </header>
  );
}
