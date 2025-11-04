import Link from 'next/link';
import { Trophy, Heart } from 'lucide-react';
import './Footer.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Platform',
      links: [
        { name: 'Flashcards', path: '/flashcards' },
        { name: 'Practice Questions', path: '/practice' },
        { name: 'Roleplay', path: '/roleplay' },
        { name: 'Leaderboard', path: '/leaderboard' },
        { name: 'Achievements', path: '/achievements' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'About FBLA', path: '/about' },
        { name: 'Study Guide', path: '/study' },
        { name: 'Competition Events', path: '/events' }
      ]
    },
    {
      title: 'Community',
      links: [
        { name: 'Join Discord', path: '#' },
        { name: 'Student Forums', path: '#' },
        { name: 'Success Stories', path: '#' },
        { name: 'Contact Us', path: '#' }
      ]
    }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="brand-logo">
              <Trophy className="logo-icon" />
              <span className="logo-text">FBLA Elevate</span>
            </div>
            <p className="brand-description">
              Empowering the next generation of business leaders through 
              comprehensive FBLA competition preparation and community engagement.
            </p>
            <div className="brand-tagline">
              <Heart className="heart-icon" />
              <span>Built for FBLA Champions</span>
            </div>
          </div>

          {/* Links Sections */}
          <div className="footer-links">
            {footerLinks.map((section, index) => (
              <div key={index} className="footer-section">
                <h3 className="section-title">{section.title}</h3>
                <ul className="section-links">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link href={link.path} className="footer-link">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} FBLA Elevate. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <Link href="/privacy" className="bottom-link">Privacy Policy</Link>
              <Link href="/terms" className="bottom-link">Terms of Service</Link>
              <Link href="/support" className="bottom-link">Support</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}