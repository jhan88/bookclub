import React from 'react';
import { useUserContext } from '../context/UserContext';
import { useLocation } from 'react-router-dom';
import MyReview from '../components/MyReview';
import AllReviews from '../components/AllReviews';

export default function Detail() {
  const { user } = useUserContext();
  const { book } = useLocation().state;
  const { id, thumbnail, title, subtitle, authors, publisher, infoLink } = book;

  return (
    <section>
      <div className="flex">
        <img
          src={thumbnail}
          alt={'thumbnail of ' + title}
          className="m-2 w-32 object-contain"
        />
        <div className="m-2 basis-full flex flex-col justify-between">
          <hgroup>
            <h1 className="text-3xl font-bold">{title}</h1>
            {subtitle && <h2 className="text-2xl font-semibold">{subtitle}</h2>}
          </hgroup>

          {authors && (
            <p>
              {authors.map((author) => (
                <span className="inline-block mx-2 font-semibold text-lg">
                  {author}
                </span>
              ))}
            </p>
          )}

          {publisher && <p className="text-sm">{publisher}</p>}
          <a
            href={infoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-light font-semibold hover:text-brand"
          >
            Check Google Books
          </a>
        </div>
      </div>
      {!user && (
        <p className="m-2 text-center text-lg font-semibold">
          Please sign in to write a review.
        </p>
      )}
      {user && <MyReview bookId={id} user={user} />}
      <AllReviews bookId={id} />
    </section>
  );
}
