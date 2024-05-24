import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://www.googleapis.com/books/v1/volumes',
  params: { maxResults: 40 },
});

function createSearchTerm(keyword) {
  return keyword.replace(' ', '+');
}

export async function search(keyword) {
  return await instance
    .get('/', {
      params: {
        q: createSearchTerm(keyword),
      },
    })
    .then((res) => res.data)
    .then((data) => {
      return data.items ? data.items : [];
    })
    .then((books) => {
      if (books.length) {
        return books.map((book) => {
          const {
            id,
            volumeInfo: {
              imageLinks: { thumbnail },
              title,
              subtitle,
              authors,
              infoLink,
              publisher,
              industryIdentifiers,
            },
            selfLink,
          } = book;

          return {
            id,
            thumbnail,
            title,
            subtitle,
            authors,
            publisher,
            infoLink,
            selfLink,
            industryIdentifiers,
          };
        });
      }
      return [];
    });
}
