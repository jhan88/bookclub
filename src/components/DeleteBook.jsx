import React from 'react';
import { deleteBook, readInventory } from '../api/firebase';
import { useQuery } from '@tanstack/react-query';
import BookCard from './BookCard';

export default function DeleteBook() {
  const { data: inventory } = useQuery({
    queryKey: ['inventory'],
    queryFn: () => readInventory(),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  const handleDelete = (id) => {
    deleteBook(id).then(() => console.log('Success!'));
  };

  return (
    <section>
      <ul>
        {inventory &&
          Object.values(inventory).map((book) => (
            <li key={book.id} className="p-4">
              <BookCard book={book} />
              <button
                onClick={() => handleDelete(book.id)}
                className="w-full p-1 my-1 rounded text-white bg-brand-light hover:bg-brand"
              >
                Delete
              </button>
            </li>
          ))}
      </ul>
    </section>
  );
}
