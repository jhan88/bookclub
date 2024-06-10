import React from 'react';

export default function BookCard({ book }) {
  const { title, subtitle, authors, thumbnail, infoLink } = book;

  return (
    <div className="basis-full h-40 sm:h-48 flex rounded shadow">
      <img
        src={thumbnail}
        alt={'thumbnail of ' + title}
        className="m-2 aspect-[2/3] object-contain hover:scale-105"
      />
      <div className="m-2 basis-full flex flex-col justify-between">
        <hgroup>
          <h1 className="text-lg md:text-xl font-semibold line-clamp-2">
            {title}
          </h1>
          {subtitle && <h2 className="md:text-lg line-clamp-1">{subtitle}</h2>}
        </hgroup>
        {authors && (
          <p className="text-sm md:text-base">
            by <span className="font-bold">{authors[0]}</span>
            {authors.length > 1 ? ' et al.' : ''}
          </p>
        )}
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
  );
}
