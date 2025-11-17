import { NavLink } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function Header() {
  /** Top navigation bar with brand and simple links. */
  return (
    <header className="header">
      <div className="container header-inner" role="navigation" aria-label="Main">
        <div className="brand">
          <div className="brand-badge" aria-hidden>🍳</div>
          <span>Recipe Explorer</span>
        </div>
        <nav className="nav">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
          <a href="https://reactjs.org" target="_blank" rel="noreferrer">Docs</a>
        </nav>
      </div>
    </header>
  );
}
