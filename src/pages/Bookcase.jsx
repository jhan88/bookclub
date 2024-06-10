import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useUserContext } from '../context/UserContext';
import { getUserReviewIds, readInventory } from '../api/firebase';
import ToggleButton from '../components/ui/ToggleButton';
import BookCard from '../components/BookCard';
import BookCardSquare from '../components/BookCardSquare';
import { Link, useNavigate } from 'react-router-dom';
import { IoListOutline, IoGridOutline } from 'react-icons/io5';

export default function Bookcase() {
  const [viewMode, setViewMode] = useState('list');

  const { user } = useUserContext();

  const navigate = useNavigate();

  const { data: inventory } = useQuery({
    queryKey: ['inventory'],
    queryFn: () => readInventory(),
    staleTime: 5 * 60 * 1000,
  });

  const { data: reviewed } = useQuery({
    queryKey: ['reviewIds', user.uid],
    queryFn: () => getUserReviewIds(user.uid),
    enabled: !!user && !!inventory,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <section>
      <h1 className="my-4 text-xl font-bold text-center">Reviewed Books</h1>
      <aside className="block text-right">
        <ToggleButton
          text={<IoListOutline className="text-2xl" />}
          handleClick={() => setViewMode('list')}
          active={viewMode === 'list'}
        />
        <ToggleButton
          text={<IoGridOutline className="text-2xl" />}
          handleClick={() => setViewMode('grid')}
          active={viewMode === 'grid'}
        />
      </aside>
      <ul className={(viewMode === 'grid' ? 'grid ' : '') + 'grid-cols-4'}>
        {inventory &&
          reviewed &&
          Object.values(inventory)
            .filter((book) => Object.keys(reviewed).includes(book.id))
            .map((book) => (
              <li key={book.id} className="p-4">
                {viewMode === 'list' && (
                  <>
                    <BookCard book={book} />
                    <button
                      onClick={() =>
                        navigate('/book/' + book.id, { state: { book } })
                      }
                      className="w-full p-1 my-1 rounded text-white bg-brand-light hover:bg-brand"
                    >
                      See all reviews
                    </button>
                  </>
                )}
                {viewMode === 'grid' && (
                  <Link to={'/book/' + book.id} state={{ book }}>
                    <BookCardSquare book={book} />
                  </Link>
                )}
              </li>
            ))}
      </ul>
    </section>
  );
}
