import React, { useState } from 'react';
import RegisterBook from '../components/RegisterBook';
import DeleteBook from '../components/DeleteBook';
import ToggleButton from '../components/ui/ToggleButton';

export default function Manage() {
  const [mode, setMode] = useState('register');

  return (
    <section>
      <nav className="flex justify-center">
        <ToggleButton
          text="Register Books"
          handleClick={() => setMode('register')}
          active={mode === 'register'}
        />
        <ToggleButton
          text="Delete Books"
          handleClick={() => setMode('delete')}
          active={mode === 'delete'}
        />
      </nav>
      {mode === 'register' && <RegisterBook />}
      {mode === 'delete' && <DeleteBook />}
    </section>
  );
}
