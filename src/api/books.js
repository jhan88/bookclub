import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://www.googleapis.com/books/v1/',
  params: { maxResults: 40 },
});

function createSearchTerm(keyword) {
  const searchTerm = Object.entries(keyword)
    .filter(([param, _]) => !['q', 'country', 'langRestrict'].includes(param))
    .reduce((prev, [param, value]) => {
      if (!value) {
        return prev;
      }
      return prev + (prev ? '+' : '') + param + ':' + value;
    }, keyword.q)
    .replace(' ', '+');
  return searchTerm;
}

export async function search(keyword) {
  return await instance
    .get('volumes', {
      params: {
        q: createSearchTerm(keyword),
        langRestrict:
          keyword.langRestrict && keyword.langRestrict.toLowerCase(),
        country: keyword.country && keyword.country.toUpperCase(),
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
            thumbnail: thumbnail || null,
            title,
            subtitle: subtitle || null,
            authors: authors || null,
            publisher: publisher || null,
            infoLink,
            selfLink,
            industryIdentifiers: industryIdentifiers || null,
          };
        });
      }
      return [];
    });
}
