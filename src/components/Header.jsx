import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <section>
      <h1>Bookclub</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to={`bookcase/:uid`}>My Bookcase</Link>
          </li>
          <li>
            <Link to="manage">Manage</Link>
          </li>
          <li>
            <button>SignIn</button>
          </li>
        </ul>
      </nav>
    </section>
  );
}
