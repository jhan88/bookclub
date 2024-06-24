import React, { useState } from 'react';
import { search } from '../api/books';
import ToggleButton from './ui/ToggleButton';
import BookCard from './BookCard';
import { v4 as uuidv4 } from 'uuid';
import useInventory from '../hooks/useInventory';
import Popup from './Popup';
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

  const { register } = useInventory();

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
    register.mutate(book, {
      onSuccess: (message) => {
        setMessage(message);
      },
      onError: (errorMessage) => {
        setMessage(errorMessage);
      },
      onSettled: () => setTimeout(() => setMessage(''), 3000),
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
            <li key={uuidv4()} className="p-4">
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
      <Popup message={message} />
    </section>
  );
}
