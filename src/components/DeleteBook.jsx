import React, { useEffect, useState } from 'react';
import { deleteBook, readInventory } from '../api/firebase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import BookCard from './BookCard';
import { createPortal } from 'react-dom';

export default function DeleteBook() {
  const queryClient = useQueryClient();

  const [message, setMessage] = useState('');

  useEffect(() => {
    queryClient.invalidateQueries(['inventory']);
  }, [queryClient]);

  const { data: inventory } = useQuery({
    queryKey: ['inventory'],
    queryFn: () => readInventory(),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  const { mutate } = useMutation({
    mutationFn: (id) => deleteBook(id),
    onSuccess: () => queryClient.invalidateQueries(['inventory']),
  });

  const handleDelete = (id) => {
    mutate(id, {
      onSuccess: () => setMessage('Success!'),
      onError: () => setMessage('Error!'),
      onSettled: () => setTimeout(() => setMessage(''), 3000),
    });
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
      {message &&
        createPortal(
          <p className="fixed bottom-0 p-2 w-full bg-brand text-center text-lg text-white font-semibold opacity-70">
            {message}
          </p>,
          document.body
        )}
    </section>
  );
}
