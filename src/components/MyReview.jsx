import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import UserPhoto from './ui/UserPhoto';
import useReview from '../hooks/useReview';

export default function MyReview({ bookId, user }) {
  const [showForm, setShowForm] = useState(false);
  const [contents, setContents] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  const { reviewed, reviewId, prevReview, submit, remove } = useReview({
    bookId,
    user,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    submit.mutate(
      { contents, isEditing },
      {
        onSuccess: () => {
          setContents('');
          setMessage('Success!');
          setShowForm(false);
          setIsEditing(false);
        },
        onError: () => setMessage('Error!'),
        onSettled: () => setTimeout(() => setMessage(''), 3000),
      }
    );
  };

  const handleDelete = () => {
    remove.mutate(reviewId, {
      onSuccess: () => {
        setMessage('Success!');
      },
      onError: () => setMessage('Error!'),
      onSettled: () => setTimeout(() => setMessage(''), 3000),
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setContents(prevReview().contents);
    setShowForm((prev) => !prev);
  };

  return (
    <div className="py-4">
      <h1 className="my-4 text-xl font-bold text-center">My Review</h1>
      {user && !reviewed && (
        <>
          <p className="m-2 text-center text-lg font-semibold">
            Please Review this book
          </p>
          <button
            onClick={() => {
              setShowForm((prev) => !prev);
              setContents();
            }}
            className="block mx-auto w-60 p-1 my-1 rounded text-white bg-brand-light hover:bg-brand"
          >
            {showForm ? 'Close' : 'Write a review'}
          </button>
        </>
      )}
      {user && reviewed && (
        <>
          <p className="m-2 text-center text-lg font-semibold">
            You've already reviewed this book
          </p>
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => handleEdit()}
              className="w-60 p-1 my-1 rounded text-white bg-brand-light hover:bg-brand"
            >
              {showForm ? 'Close' : 'Edit your review'}
            </button>
            <button
              onClick={() => handleDelete(reviewId)}
              className="w-60 p-1 my-1 rounded text-white bg-brand-light hover:bg-brand"
            >
              Delete
            </button>
          </div>
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
