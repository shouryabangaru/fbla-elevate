import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, Trophy } from 'lucide-react';
import './Navbar.css';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  const { user } = useAuth();

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Practice', path: '/practice' },
    { name: 'Roleplay', path: '/roleplay' },
    { name: 'Flashcards', path: '/flashcards' },
    { name: 'Leaderboard', path: '/leaderboard' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link href="/" className="navbar-logo">
          <Trophy className="logo-icon" />
          <span className="logo-text">FBLA Elevate</span>
        </Link>

        {/* Desktop Menu */}
        <div className="navbar-menu">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`navbar-item ${location === item.path ? 'active' : ''}`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* User Greeting */}
        <div className="navbar-user">
          {user ? (
            <span className="user-greeting">Welcome, {user.name}!</span>
          ) : (
            <span className="user-greeting">Welcome, Guest!</span>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`mobile-menu-item ${location === item.path ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          {user && (
            <div className="mobile-user-greeting">
              Welcome, {user.name}!
            </div>
          )}
        </div>
      )}
    </nav>
  );
}