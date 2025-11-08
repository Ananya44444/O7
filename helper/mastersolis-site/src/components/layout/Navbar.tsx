'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  const { user, logout, isAuthenticated, isAdmin, loading } = useAuth();
  
  // Ensure we're on client side to prevent hydration mismatch
  React.useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Debug authentication state
  React.useEffect(() => {
    console.log('Navbar auth state:', { isAuthenticated, user: user?.firstName, isAdmin });
  }, [isAuthenticated, user, isAdmin]);

  const [builderDropdownOpen, setBuilderDropdownOpen] = useState(false);
  
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/careers', label: 'Careers' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <nav className="academy-glass sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 academy-btn-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-xl">🎓</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold academy-text-gradient">MasterSolis</span>
                <span className="text-xs text-academy-text-muted -mt-1">Academy</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-xl group',
                  isActive(link.href)
                    ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg'
                    : 'text-academy-text-secondary hover:text-white hover:bg-white/10 academy-focus'
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-yellow-400 rounded-full"></div>
                )}
              </Link>
            ))}
            
            {/* Builder Dropdown */}
            {isClient && isAuthenticated && (
              <div className="relative">
                <button
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-xl group flex items-center space-x-2',
                    (pathname.startsWith('/builder') || builderDropdownOpen)
                      ? 'text-white bg-linear-to-r from-purple-500 to-pink-600 shadow-lg'
                      : 'text-academy-text-secondary hover:text-white hover:bg-white/10 academy-focus'
                  )}
                  onClick={() => setBuilderDropdownOpen(!builderDropdownOpen)}
                  onMouseEnter={() => setBuilderDropdownOpen(true)}
                >
                  <span>🛠️ Builder</span>
                  <svg
                    className={cn(
                      'w-4 h-4 transition-transform duration-300',
                      builderDropdownOpen && 'rotate-180'
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {builderDropdownOpen && (
                  <div
                    className="absolute left-0 mt-2 w-56 academy-glass-card rounded-2xl py-3 z-50 academy-slide-in"
                    onMouseLeave={() => setBuilderDropdownOpen(false)}
                  >
                    <Link
                      href="/builder/email"
                      className="block px-4 py-3 text-sm text-academy-text-secondary hover:text-white hover:bg-linear-to-r hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300 mx-2 rounded-xl"
                      onClick={() => setBuilderDropdownOpen(false)}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">📧</span>
                        <div>
                          <div className="font-medium">Email Templates</div>
                          <div className="text-xs text-academy-text-muted">Create professional emails</div>
                        </div>
                      </div>
                    </Link>
                    <Link
                      href="/builder/resume"
                      className="block px-4 py-3 text-sm text-academy-text-secondary hover:text-white hover:bg-linear-to-r hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 mx-2 rounded-xl"
                      onClick={() => setBuilderDropdownOpen(false)}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">📄</span>
                        <div>
                          <div className="font-medium">Resume Builder</div>
                          <div className="text-xs text-academy-text-muted">Build your perfect resume</div>
                        </div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {!isClient || loading ? (
              // Show skeleton/loading state during hydration
              <div className="flex items-center space-x-3">
                <div className="h-10 w-20 bg-white/20 rounded-xl animate-pulse"></div>
                <div className="h-10 w-24 bg-white/20 rounded-xl animate-pulse"></div>
              </div>
            ) : isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {isAdmin && (
                  <Link href="/admin">
                    <Button className="academy-btn-secondary h-10 px-4 rounded-xl font-medium">
                      👨‍💼 Admin
                    </Button>
                  </Link>
                )}
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-academy-text-primary">
                      {user?.firstName} {user?.lastName}
                    </div>
                    <div className="text-xs text-academy-text-muted">Student</div>
                  </div>
                  <div className="w-10 h-10 academy-btn-primary rounded-full flex items-center justify-center text-lg">
                    👤
                  </div>
                  <Button 
                    className="academy-btn-secondary h-10 px-4 rounded-xl font-medium hover:text-red-400"
                    onClick={handleLogout}
                  >
                    🚪 Logout
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/auth/login">
                  <Button className="academy-btn-secondary h-10 px-6 rounded-xl font-medium">
                    🔑 Login
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="academy-btn-primary h-10 px-6 rounded-xl font-medium">
                    🎓 Join Academy
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <Button
              className="academy-btn-secondary w-12 h-12 rounded-2xl academy-focus"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span
                  className={cn(
                    'bg-academy-text-primary block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm',
                    isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
                  )}
                ></span>
                <span
                  className={cn(
                    'bg-academy-text-primary block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5',
                    isMenuOpen ? 'opacity-0' : 'opacity-100'
                  )}
                ></span>
                <span
                  className={cn(
                    'bg-academy-text-primary block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm',
                    isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
                  )}
                ></span>
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden academy-glass-card border-t border-white/10 academy-slide-in">
          <div className="px-4 pt-4 pb-6 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'block px-4 py-3 text-base font-medium rounded-2xl transition-all duration-300',
                  isActive(link.href)
                    ? 'text-white bg-linear-to-r from-blue-500 to-purple-600 shadow-lg'
                    : 'text-academy-text-secondary hover:text-white hover:bg-white/10'
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Mobile Auth Section */}
            <div className="pt-4 mt-4 border-t border-white/10">
              {!isClient || loading ? (
                // Show loading state during hydration
                <div className="space-y-3">
                  <div className="h-12 bg-white/20 rounded-2xl animate-pulse mx-1"></div>
                  <div className="h-12 bg-white/20 rounded-2xl animate-pulse mx-1"></div>
                </div>
              ) : isAuthenticated ? (
                <div className="space-y-3">
                  <div className="px-4 py-3 rounded-2xl bg-white/5">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 academy-btn-primary rounded-full flex items-center justify-center text-lg">
                        👤
                      </div>
                      <div>
                        <div className="text-sm font-medium text-academy-text-primary">
                          {user?.firstName} {user?.lastName}
                        </div>
                        <div className="text-xs text-academy-text-muted">Student</div>
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/builder/email"
                    className="block px-4 py-3 text-base font-medium text-academy-text-secondary hover:text-white hover:bg-linear-to-r hover:from-blue-500/20 hover:to-purple-500/20 rounded-2xl transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    📧 Email Templates
                  </Link>
                  <Link
                    href="/builder/resume"
                    className="block px-4 py-3 text-base font-medium text-academy-text-secondary hover:text-white hover:bg-linear-to-r hover:from-purple-500/20 hover:to-pink-500/20 rounded-2xl transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    📄 Resume Builder
                  </Link>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="block px-4 py-3 text-base font-medium text-academy-text-secondary hover:text-white hover:bg-white/10 rounded-2xl transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      👨‍💼 Admin Dashboard
                    </Link>
                  )}
                  <button
                    className="block w-full text-left px-4 py-3 text-base font-medium text-academy-text-secondary hover:text-red-400 hover:bg-red-500/10 rounded-2xl transition-all duration-300"
                    onClick={handleLogout}
                  >
                    🚪 Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link
                    href="/auth/login"
                    className="block px-4 py-3 text-base font-medium text-center text-academy-text-secondary hover:text-white hover:bg-white/10 rounded-2xl transition-all duration-300 border border-white/20"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    🔑 Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="block px-4 py-3 text-base font-medium text-center text-white academy-btn-primary rounded-2xl shadow-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    🎓 Join Academy
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;