import React, { useState } from 'react';
import UserPhoto from './ui/UserPhoto';

export default function ReviewCard({ review }) {
  const { reviewer, createdAt, lastEditedAt, contents } = review;
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="m-4 flex gap-2">
      <article className="p-2 basis-full rounded shadow">
        <div className="flex items-center gap-2">
          <UserPhoto user={reviewer} />
          <p className="text-sm">
            {new Date(createdAt).toLocaleString('en-US')}{' '}
            {lastEditedAt && (
              <i className="block sm:inline-block">
                (Last modified at{' '}
                {new Date(lastEditedAt).toLocaleString('en-US')})
              </i>
            )}
          </p>
        </div>
        <pre
          className={
            'm-2 whitespace-pre-wrap' +
            (showAll ? '' : ' line-clamp-2 overflow-hidden')
          }
        >
          {contents}
        </pre>
        <button
          className="text-sm font-semibold text-brand-light hover:text-brand"
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? 'Hide' : 'Show all'}
        </button>
      </article>
    </div>
  );
}
