import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { readInventory } from '../api/firebase';
import BookCard from '../components/BookCard';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const { data: inventory } = useQuery({
    queryKey: ['inventory'],
    queryFn: () => readInventory(),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <section>
      <ul>
        {inventory &&
          Object.values(inventory).map((book) => (
            <li key={book.id} className="p-4">
              <BookCard book={book} />
              <button
                onClick={() => navigate('book/' + book.id)}
                className="w-full p-1 my-1 rounded text-white bg-brand-light hover:bg-brand"
              >
                Review this book
              </button>
            </li>
          ))}
      </ul>
    </section>
  );
}
