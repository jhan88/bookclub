import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav({ user }) {
  return (
    <nav className="shrink-0">
      <ul className="flex gap-2 items-center *:shrink-0">
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
      </ul>
    </nav>
  );
}
