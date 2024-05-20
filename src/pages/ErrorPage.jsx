import React from 'react';
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div>
      <p>Sorry, an unexpected error has been occured.</p>
      <p>{error.statusText || error.message}</p>
    </div>
  );
}
