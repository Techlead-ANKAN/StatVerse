import React, { useState } from 'react';
import './header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <nav className="nav container">
        <div className="nav__logo">
          <span className="nav__logo-gradient">Dev</span>Metrics
        </div>

        <div className={`nav__menu ${isMenuOpen ? 'show-menu' : ''}`}>
          <ul className="nav__list">
            <li className="nav__item">
              <a href="#dashboard" className="nav__link">Dashboard</a>
            </li>
            <li className="nav__item">
              <a href="#analytics" className="nav__link">Analytics</a>
            </li>
            <li className="nav__item">
              <a href="#reports" className="nav__link">Reports</a>
            </li>
            <li className="nav__item">
              <a href="#team" className="nav__link">Team</a>
            </li>
          </ul>

          <button className="nav__button">Get Started</button>
        </div>

        <div 
          className={`nav__toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className="nav__toggle-line"></span>
          <span className="nav__toggle-line"></span>
          <span className="nav__toggle-line"></span>
        </div>
      </nav>
    </header>
  );
};

export default Header;