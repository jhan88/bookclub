import React from 'react';

export default function BookCardSquare({ book }) {
  const { title, authors, thumbnail } = book;

  return (
    <div className="relative m-auto flex justify-center items-center h-48 sm:h-52 aspect-[2/3] md:aspect-square rounded overflow-hidden shadow hover:shadow-lg hover:scale-105">
      <div className="absolute p-2 flex flex-col justify-around bg-gray-100 h-full w-full transition opacity-0 -translate-y-10 hover:opacity-80 hover:translate-y-0">
        <h1 className="font-bold line-clamp-3">{title}</h1>
        {authors && (
          <p>
            by <span className="font-semibold text-sm">{authors[0]}</span>
            {authors.length > 1 ? ' et al.' : ''}
          </p>
        )}
      </div>
      <img
        src={thumbnail}
        alt={'thumbnail of ' + title}
        className="max-h-40 sm:max-h-48 aspect-[2/3] object-contain"
      />
    </div>
  );
}
