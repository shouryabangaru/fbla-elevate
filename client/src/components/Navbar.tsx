import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Menu, X, GraduationCap } from 'lucide-react';
import { AuthModal } from './AuthModal';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState<'login' | 'signup' | null>(null);
  const { user, logout } = useAuth();
  const [location] = useLocation();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/practice', label: 'Practice Questions' },
    { href: '/practice-test', label: 'Practice Test' },
    { href: '/roleplay', label: 'Roleplay Practice' },
    { href: '/flashcards', label: 'Flashcards' },
    { href: '/leaderboard', label: 'Leaderboard' },
    { href: '/achievements', label: 'Achievements' },
    { href: '/about', label: 'About Us' },
  ];

  const isActive = (href: string) => {
    return location === href || (href !== '/' && location.startsWith(href));
  };

  return (
    <>
      <nav className="bg-fbla-blue shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <GraduationCap className="text-fbla-yellow w-8 h-8 mr-2" />
                <span className="text-fbla-white font-bold text-xl">FBLA Elevate</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive(link.href)
                        ? 'text-fbla-yellow'
                        : 'text-gray-300 hover:text-fbla-yellow'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-fbla-white">Welcome, {user.name}</span>
                  <Button
                    onClick={logout}
                    variant="outline"
                    className="text-fbla-white border-fbla-white hover:bg-fbla-white hover:text-fbla-blue"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    onClick={() => setAuthModal('login')}
                    variant="ghost"
                    className="text-fbla-white hover:text-fbla-yellow"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => setAuthModal('signup')}
                    className="bg-fbla-yellow hover:bg-yellow-600 text-fbla-blue"
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                variant="ghost"
                className="text-fbla-white hover:text-fbla-yellow p-2"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-fbla-blue border-t border-gray-600">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive(link.href)
                      ? 'text-fbla-yellow'
                      : 'text-gray-300 hover:text-fbla-yellow'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 pb-3 border-t border-gray-600">
                {user ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2 text-fbla-white">Welcome, {user.name}</div>
                    <Button
                      onClick={logout}
                      variant="outline"
                      className="w-full text-fbla-white border-fbla-white hover:bg-fbla-white hover:text-fbla-blue"
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button
                      onClick={() => setAuthModal('login')}
                      variant="ghost"
                      className="w-full text-fbla-white hover:text-fbla-yellow"
                    >
                      Login
                    </Button>
                    <Button
                      onClick={() => setAuthModal('signup')}
                      className="w-full bg-fbla-yellow hover:bg-yellow-600 text-fbla-blue"
                    >
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Auth Modals */}
      {authModal && (
        <AuthModal
          mode={authModal}
          onClose={() => setAuthModal(null)}
          onSwitchMode={(mode) => setAuthModal(mode)}
        />
      )}
    </>
  );
}
