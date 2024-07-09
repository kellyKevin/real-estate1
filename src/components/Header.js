import React from 'react';
import './Header.css';

const Header = () => (
  <header className="header">
    <h1>Real Estate App</h1>
    <nav>
      <a href="/">Home</a>
      <a href="/add">Add Property</a>
    </nav>
  </header>
);

export default Header;
