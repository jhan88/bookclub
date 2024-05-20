import React, { useEffect, useState } from 'react';

export default function Home() {
  const [books, setBooks] = useState();
  useEffect(() => {
    fetch('data/mockdata.json')
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.books);
      });
  }, []);

  return (
    <div>
      Home
      {books && books.map((book) => <p>{book.volumeInfo.title}</p>)}
    </div>
  );
}
