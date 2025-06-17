import React from 'react';
import './Header.css';

const Header = () => (
  <header className="header">
    <div className="header-container">
      <div className="logo">
        <h1>Little Lemon</h1>
      </div>
      <nav className="nav">
        <a href="#booking" className="nav-link">Book Table</a>
      </nav>
    </div>
  </header>
);

export default Header;
