import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getBookReviews } from '../api/firebase';

export default function AllReviews({ bookId }) {
  const { data: reviews } = useQuery({
    queryKey: ['reviews', bookId],
    queryFn: () => getBookReviews(bookId),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  return (
    <div className="py-4">
      <h1 className="my-4 text-xl font-bold text-center">All Reviews</h1>
      <ul>
        {reviews &&
          Object.entries(reviews).map(([id, review]) => {
            return <li key={id}>{/* Review Card */}</li>;
          })}
      </ul>
    </div>
  );
}
