import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoMenu } from 'react-icons/io5';
import ToggleButton from './ui/ToggleButton';

export default function Nav({ user }) {
  const [dropdown, setDropdown] = useState(window.innerWidth <= 640);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const toggleDropdown = (e) => {
    setDropdown(e.matches);
  };

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 640px)');
    mql.addEventListener('change', toggleDropdown);

    setOpen(false);

    window.scrollTo(0, 0);

    return () => mql.removeEventListener('change', toggleDropdown);
  }, [location]);

  return (
    <>
      <div className="visible sm:invisible">
        {user && (
          <ToggleButton
            text={<IoMenu className="text-lg  hover:text-brand-accent" />}
            handleClick={() => setOpen((prev) => !prev)}
            active={open}
          />
        )}
      </div>
      <nav
        className={
          user &&
          (dropdown
            ? 'absolute w-full py-2 -translate-x-4 bg-inherit transition' +
              (open
                ? ' translate-y-24 opacity-90'
                : ' -translate-y-full opacity-0')
            : '')
        }
      >
        <ul
          className={
            'flex justify-end gap-2 items-center *:shrink-0 *:p-1 *:border-b *:border-transparent hover:*' +
            (dropdown ? ' flex-col' : ' flex-row')
          }
        >
          <li className="hover:text-brand-accent hover:border-brand-accent">
            <Link to="/">Home</Link>
          </li>
          {user && (
            <li className="hover:text-brand-accent hover:border-brand-accent">
              <Link to={'bookcase/' + user.uid}>My Bookcase</Link>
            </li>
          )}
          {user && user.isAdmin && (
            <li className="hover:text-brand-accent hover:border-brand-accent">
              <Link to="manage">Manage</Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}
