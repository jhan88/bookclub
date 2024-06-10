import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { readInventory } from '../api/firebase';
import ToggleButton from '../components/ui/ToggleButton';
import BookCard from '../components/BookCard';
import BookCardSquare from '../components/BookCardSquare';
import { Link, useNavigate } from 'react-router-dom';
import { IoListOutline, IoGridOutline } from 'react-icons/io5';

export default function Home() {
  const [viewMode, setViewMode] = useState('list');

  const navigate = useNavigate();

  const { data: inventory } = useQuery({
    queryKey: ['inventory'],
    queryFn: () => readInventory(),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <section>
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
          Object.values(inventory).map((book) => (
            <li key={book.id} className="p-4">
              {viewMode === 'list' && (
                <>
                  <BookCard book={book} />
                  <button
                    onClick={() =>
                      navigate('book/' + book.id, { state: { book } })
                    }
                    className="w-full p-1 my-1 rounded text-white bg-brand-light hover:bg-brand"
                  >
                    Review this book
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
