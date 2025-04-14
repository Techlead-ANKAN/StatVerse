import React, { useState, useEffect } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import './header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="nav container">
        <div className="nav__logo">
          <span className="nav__logo-gradient">Stat</span>Verse
        </div>

        <div className={`nav__menu ${isMenuOpen ? 'show-menu' : ''}`}>
          <ul className="nav__list">
            {['Dashboard', 'Analytics', 'Reports', 'Team'].map((item) => (
              <li className="nav__item" key={item}>
                <a href={`#${item.toLowerCase()}`} className="nav__link">
                  {item}
                  <span className="nav__link-underline"></span>
                </a>
              </li>
            ))}
          </ul>

          <div className="nav__auth">
            <SignedOut>
              <SignInButton className="nav__button" />
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" className="user-button" />
            </SignedIn>
          </div>
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