import React, { useState } from 'react';
import { search } from '../api/books';

export default function RegisterBook() {
  const [result, setResult] = useState();
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    search(keyword)
      .then(setResult)
      .catch((error) => console.log(error.message));
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h1 className="my-4 text-xl font-bold text-center">
          Search in Google Books
        </h1>
        <div className="flex gap-2 items-center">
          <label htmlFor="q" className="font-semibold text-lg min-w-40">
            Keyword
          </label>
          <input
            id="q"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            required
            className="basis-full p-2 rounded outline-none border focus:border-brand-accent"
          />
        </div>
        <button
          type="submit"
          className="w-full p-1 my-1 rounded text-white bg-brand-light hover:bg-brand"
        >
          Search
        </button>
      </form>
      <ul>
        {result && result.map((book) => <li key={book.id}>{book.title}</li>)}
      </ul>
    </section>
  );
}
