import React, { useState } from 'react';
import { search } from '../api/books';
import ToggleButton from './ui/ToggleButton';
import BookCard from './BookCard';
import { registerBook } from '../api/firebase';
import { createPortal } from 'react-dom';

export default function RegisterBook() {
  const [mode, setMode] = useState('basic');
  const [result, setResult] = useState();
  const [keyword, setKeyword] = useState({
    q: '',
    intitle: '',
    inauthor: '',
    inpublisher: '',
    isbn: '',
    country: '',
    langRestrict: '',
  });
  const [message, setMessage] = useState('');

  const { q, intitle, inauthor, inpublisher, isbn, country, langRestrict } =
    keyword;

  const resetKeyword = () =>
    setKeyword({
      q: '',
      intitle: '',
      inauthor: '',
      inpublisher: '',
      isbn: '',
      country: '',
      langRestrict: '',
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult();
    search(keyword)
      .then(setResult)
      .catch((error) => console.log(error.message));
  };

  const handleChange = (e) => {
    setKeyword((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const handleRegister = (book) => {
    registerBook(book).then((message) => {
      setMessage(message);
      setTimeout(() => setMessage(''), 3000);
    });
  };

  return (
    <section>
      <h1 className="my-4 text-xl font-bold text-center">
        Search in Google Books{' '}
      </h1>
      <nav className="flex">
        <ToggleButton
          text="Basic Search"
          handleClick={() => {
            resetKeyword();
            setMode('basic');
          }}
          active={mode === 'basic'}
        />
        <ToggleButton
          text="Advanced Search"
          handleClick={() => {
            resetKeyword();
            setMode('advanced');
          }}
          active={mode === 'advanced'}
        />
      </nav>
      <form onSubmit={handleSubmit}>
        <ul className="*:flex *:gap-2 *:items-center">
          <li>
            <input
              id="q"
              placeholder="Keyword"
              value={q}
              onChange={handleChange}
              required={mode === 'basic'}
              className="register-book__input"
            />
          </li>
          {mode === 'advanced' && (
            <>
              <li>
                <input
                  id="intitle"
                  placeholder="Title"
                  value={intitle}
                  onChange={handleChange}
                  className="register-book__input"
                />
              </li>
              <li>
                <input
                  id="inauthor"
                  placeholder="Author"
                  value={inauthor}
                  onChange={handleChange}
                  className="register-book__input"
                />
              </li>
              <li>
                <input
                  id="inpublisher"
                  placeholder="Publisher"
                  value={inpublisher}
                  onChange={handleChange}
                  className="register-book__input"
                />
              </li>
              <li>
                <input
                  id="isbn"
                  placeholder="ISBN"
                  value={isbn}
                  onChange={handleChange}
                  className="register-book__input"
                />
              </li>
              <li>
                <input
                  id="country"
                  placeholder="Country (e.g. US, KR, ...)"
                  value={country}
                  onChange={handleChange}
                  className="register-book__input"
                />
              </li>
              <li>
                <input
                  id="langRestrict"
                  placeholder="Language (e.g. en, kr, ...)"
                  value={langRestrict}
                  onChange={handleChange}
                  className="register-book__input"
                />
              </li>
            </>
          )}
        </ul>
        <button
          type="submit"
          className="w-full p-1 my-1 rounded text-white bg-brand-light hover:bg-brand"
        >
          Search
        </button>
      </form>
      <ul>
        {result &&
          result.map((book) => (
            <li key={book.id} className="p-4">
              <BookCard book={book} />
              <button
                onClick={() => handleRegister(book)}
                className="w-full p-1 my-1 rounded text-white bg-brand-light hover:bg-brand"
              >
                Register
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