import React from 'react';

// PUBLIC_INTERFACE
export default function Footer() {
  /** Footer with subtle styling. */
  return (
    <footer className="footer">
      <div className="container">
        <span>© {new Date().getFullYear()} Recipe Explorer</span>
      </div>
    </footer>
  );
}
