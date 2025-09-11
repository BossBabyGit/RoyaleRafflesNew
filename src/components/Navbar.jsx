import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="header">
      <nav className="nav">
        <div className="logo">
          <span className="crown">👑</span> Royal Raffles UK
        </div>
        <ul className="nav-links">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/raffles" className="nav-link">All Raffles</Link></li>
          <li><Link to="/winners" className="nav-link">Past Winners</Link></li>
          <li><a href="#faq" className="nav-link">FAQ</a></li>
          <li><Link to="/login" className="button button-outline">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
}
