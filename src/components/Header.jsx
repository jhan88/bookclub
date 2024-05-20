import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
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
            <button>SignIn</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
