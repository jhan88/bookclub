import React from 'react';

export default function ToggleButton({ text, handleClick, active }) {
  return (
    <button
      onClick={handleClick}
      className={
        'basis-full p-1 my-1 rounded border hover:shadow font-semibold' +
        (active ? ' bg-brand text-white' : '')
      }
    >
      {text}
    </button>
  );
}
