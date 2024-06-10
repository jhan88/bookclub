import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteReview, isReviewed, submitReview } from '../api/firebase';
import { useEffect, useState } from 'react';

export default function useReview({ bookId, user }) {
  const [reviewed, setReviewed] = useState(false);

  useEffect(() => {
    isReviewed(user.uid, bookId, setReviewed);
  }, [user, bookId]);

  const reviewId = user.uid + '-review-' + bookId;

  const queryClient = useQueryClient();

  const prevReview = () => {
    return reviewed
      ? queryClient.getQueryData(['reviews', bookId])[reviewId]
      : null;
  };

  const submit = useMutation({
    mutationFn: ({ contents, isEditing }) => {
      submitReview(user, bookId, contents, isEditing);
    },
    onSuccess: () =>
      queryClient.invalidateQueries(
        ['reviews', bookId],
        ['reviewIds', user.uid]
      ),
  });

  const remove = useMutation({
    mutationFn: (reviewId) => deleteReview(user.uid, bookId, reviewId),
    onSuccess: () =>
      queryClient.invalidateQueries(
        ['reviews', bookId],
        ['reviewIds', user.uid]
      ),
  });

  return { reviewed, reviewId, prevReview, submit, remove };
}
