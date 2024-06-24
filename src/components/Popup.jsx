import React from 'react';
import { createPortal } from 'react-dom';

export default function Popup({ message }) {
  if (message) {
    return createPortal(
      <p className="fixed bottom-0 p-2 w-full bg-brand text-center text-lg text-white font-semibold opacity-70">
        {message}
      </p>,
      document.body
    );
  }
}
