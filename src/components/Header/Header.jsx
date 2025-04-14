import React, { useState, useEffect } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import './header.css';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

const Header = () => {
  const { user, isLoaded } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPlatformModal, setShowPlatformModal] = useState(false);
  const [platformUsernames, setPlatformUsernames] = useState({
    LeetCode_Username: '',
    Geeks4Geeks_Username: '',
    HackerRank_Username: '',
    CodeChef_Username: ''
  });

  const tabs = [
    { name: "Dashboard", url: "/dashboard" },
    { name: "Analytics", url: "/analytics" },
    { name: "Reports", url: "/reports" },
    { name: "Team", url: "/team" },
    { name: "About", url: "/about" },
  ];

  const insertNewUser = async (user) => {
    const { data, error } = await supabase.from('Users').insert([
      {
        UserID: user.id,
        UserEmail: user.primaryEmailAddress.emailAddress,
        FullName: user.fullName,
      },
    ]);

    if (error) {
      console.error('Insert Error:', error);
    } else {
      console.log('User inserted successfully');
      setShowPlatformModal(true);
    }
  };

  const checkNewUsers = async (user) => {
    if (!user) return;

    const { data, error } = await supabase
      .from('Users')
      .select('*')
      .eq('UserID', user.id);

    if (error) {
      console.error('Check Error:', error);
      return;
    }

    if (data.length === 0) {
      await insertNewUser(user);
    } else {
      console.log('User already exists');
    }
  };

  const handlePlatformSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('Users')
        .update(platformUsernames)
        .eq('UserID', user.id);

      if (error) throw error;
      setShowPlatformModal(false);
    } catch (error) {
      console.error('Error saving platforms:', error);
    }
  };

  const handlePlatformChange = (platform, value) => {
    setPlatformUsernames(prev => ({
      ...prev,
      [platform]: value
    }));
  };

  useEffect(() => {
    if (isLoaded) {
      checkNewUsers(user);
    }
  }, [isLoaded]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className={`header ${isScrolled ? "scrolled" : ""}`}>
        <nav className="nav container">
          <div className="nav__logo">
            <span className="nav__logo-gradient">Stat</span>Verse
          </div>

          <div className={`nav__menu ${isMenuOpen ? "show-menu" : ""}`}>
            <ul className="nav__list">
              {tabs.map((tab) => (
                <li className="nav__item" key={tab.name}>
                  <Link to={tab.url} className="nav__link">
                    {tab.name}
                    <span className="nav__link-underline"></span>
                  </Link>
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
            className={`nav__toggle ${isMenuOpen ? "active" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <span className="nav__toggle-line"></span>
            <span className="nav__toggle-line"></span>
            <span className="nav__toggle-line"></span>
          </div>
        </nav>
      </header>

      {
        showPlatformModal && (
          <div className="platform-modal-overlay">
            <div className="platform-modal">
              <h2 className="modal-title">Connect Your Coding Profiles</h2>
              <p className="modal-subtitle">Help us track your coding progress by connecting your profiles</p>

              <form onSubmit={handlePlatformSubmit} className="platform-form">
                {[
                  { name: 'LeetCode_Username', label: 'LeetCode', icon: '💡' },
                  { name: 'Geeks4Geeks_Username', label: 'GeeksforGeeks', icon: '📚' },
                  { name: 'CodeChef_Username', label: 'CodeChef_Username', icon: '⭐' },
                  { name: 'HackerRank_Username', label: 'CodeChef_Username', icon: '⭐' }
                ].map((platform) => (
                  <div key={platform.name} className="input-group">
                    <label>
                      {platform.icon} {platform.label}
                    </label>
                    <input
                      type="text"
                      placeholder={`${platform.label} username`}
                      value={platformUsernames[platform.name]}
                      onChange={(e) => handlePlatformChange(platform.name, e.target.value)}
                      className="platform-input"
                    />
                  </div>
                ))}

                <div className="modal-actions">
                  <button type="submit" className="submit-button">
                    Save Preferences
                  </button>
                  <p className="note">You can update these later in your profile settings</p>
                </div>
              </form>
            </div>
          </div>
        )
      }
    </>
  );
};

export default Header;
