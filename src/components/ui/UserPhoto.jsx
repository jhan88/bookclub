import React from 'react';

export default function UserPhoto({ user }) {
  if (user) {
    return (
      <img
        src={user.photoURL}
        alt={'profile of ' + user.displayName}
        className="w-8 h-8 rounded-full"
      />
    );
  } else {
    return (
      <div className="w-8 h-8 rounded-full bg-brand-light leading-8 text-lg text-center shrink-0">
        ?
      </div>
    );
  }
}
