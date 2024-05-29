import React, { useState } from 'react';
import { useUserContext } from '../context/UserContext';
import { submitReview } from '../api/firebase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPortal } from 'react-dom';
import UserPhoto from './ui/UserPhoto';

export default function MyReview({ bookId }) {
  const { user } = useUserContext();
  const [showForm, setShowForm] = useState(false);
  const [contents, setContents] = useState('');
  const [message, setMessage] = useState('');

  const queryClient = useQueryClient();

  const mutationSubmit = useMutation({
    mutationFn: (contents) => {
      submitReview(user, bookId, contents);
    },
    onSuccess: () => queryClient.invalidateQueries(['reviews', bookId]),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutationSubmit.mutate(contents, {
      onSuccess: () => {
        setContents('');
        setMessage('Success!');
        setShowForm(false);
      },
      onError: () => setMessage('Error!'),
      onSettled: () => setTimeout(() => setMessage(''), 3000),
    });
  };

  return (
    <div className="py-4">
      <h1 className="my-4 text-xl font-bold text-center">My Review</h1>
      {!user && (
        <p className="m-2 text-center text-lg font-semibold">
          Please sign in first.
        </p>
      )}
      {user && (
        <>
          <p className="m-2 text-center text-lg font-semibold">
            Please Review this book
          </p>
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="block mx-auto w-60 p-1 my-1 rounded text-white bg-brand-light hover:bg-brand"
          >
            {showForm ? 'Close' : 'Write a review'}
          </button>
        </>
      )}
      {showForm && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="flex gap-2">
            <UserPhoto user={user} />
            <div className="basis-full">
              <textarea
                id="review"
                placeholder="Write your review"
                value={contents}
                onChange={(e) => setContents(e.target.value)}
                required
                minLength="10"
                maxLength="1000"
                className="resize-none w-full h-32 p-2 rounded outline-none border border-trasparent shadow focus:border-brand-accent"
              ></textarea>
              <button
                type="submit"
                className="w-full p-1 my-1 rounded text-white bg-brand-light hover:bg-brand"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      )}
      {message &&
        createPortal(
          <p className="fixed bottom-0 p-2 w-full bg-brand text-center text-lg text-white font-semibold opacity-70">
            {message}
          </p>,
          document.body
        )}
    </div>
  );
}
