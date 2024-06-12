import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
export default function Footer() {
  return (
    <footer className="w-full mt-4 p-4 bg-brand-dark text-white">
      <ul className="my-4 flex gap-4 justify-center items-center text-2xl">
        <li>
          <a
            href="https://github.com/jhan88"
            target="_blank"
            rel="noreferrer"
            title="link to github of Jiyeon Han"
          >
            <FaGithub className="hover:text-brand-accent hover:scale-110" />
          </a>
        </li>
        <li>
          <a
            href="https://linkedin.com/in/jiyeon-han-83b0b4154"
            target="_blank"
            rel="noreferrer"
            title="link to linkedin profile of Jiyeon Han"
          >
            <FaLinkedin className="hover:text-brand-accent hover:scale-110" />
          </a>
        </li>
      </ul>
      <p className="my-4 text-sm text-center">
        Copyright©2024 Jiyeon Han All rights reserved
      </p>
    </footer>
  );
}
