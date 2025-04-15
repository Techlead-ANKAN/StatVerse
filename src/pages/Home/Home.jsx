import React from 'react';
import './Home.css';
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const techTerms = [
    'DSA', 'React', 'Node', 'Python', 'Java', 'AWS', 
    'Docker', 'K8s', 'AI', 'ML', 'SQL', 'Git', 'UX', 
    'UI', 'DevOps', 'Cloud', 'Swift', 'Ruby', 'PHP', 'CI/CD'
  ];

  return (
    <div className="home-home-container">
      <section className="home-hero">
        <div className="home-floating-elements">
          {techTerms.map((term, i) => {
            const startX = Math.random() * 100;
            const startY = Math.random() * 100;
            const endX = startX + (Math.random() * 40 - 20);
            const endY = startY + (Math.random() * 40 - 20);
            
            return (
              <div
                key={i}
                className="home-floating-element"
                style={{
                  '--x-start': `${startX}vw`,
                  '--y-start': `${startY}vh`,
                  '--x-end': `${endX}vw`,
                  '--y-end': `${endY}vh`,
                  animationDuration: `${20 + Math.random() * 20}s`,
                  fontSize: `${0.8 + Math.random() * 1.2}rem`,
                  filter: `blur(${Math.random() * 2}px)`,
                  opacity: `${0.2 + Math.random() * 0.3}`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
              >
                {term}
              </div>
            )
          })}
        </div>

        <div className="home-hero-content">
          <h1 className="home-hero-title">
            <span className="home-gradient-text">Stat</span>Verse
          </h1>
          <p className="home-hero-subtitle">
            Your Unified Dashboard for Coding Platform Analytics
          </p>
          <div className="home-hero-cta">
            <SignedOut>
              <SignInButton className="home-cta-button">
                <button>Get Started</button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link to="/dashboard" className="home-cta-button">Get Started</Link>
            </SignedIn>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;