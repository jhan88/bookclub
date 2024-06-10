import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useUserContext } from '../context/UserContext';
import { getUserReviewIds, readInventory } from '../api/firebase';
import BookCard from '../components/BookCard';
import { useNavigate } from 'react-router-dom';

export default function Bookcase() {
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
      <ul>
        {inventory &&
          reviewed &&
          Object.values(inventory)
            .filter((book) => Object.keys(reviewed).includes(book.id))
            .map((book) => (
              <li key={book.id} className="p-4">
                <BookCard book={book} />
                <button
                  onClick={() =>
                    navigate('/book/' + book.id, { state: { book } })
                  }
                  className="w-full p-1 my-1 rounded text-white bg-brand-light hover:bg-brand"
                >
                  See all reviews
                </button>
              </li>
            ))}
      </ul>
    </section>
  );
}
