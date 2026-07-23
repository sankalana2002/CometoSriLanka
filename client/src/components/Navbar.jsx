import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Destinations', path: '/destinations' },
    { name: 'Packages', path: '/places' },
    { name: 'Hotels', path: '/hotels' },
    { name: 'Transport', path: '/transport' },
    { name: 'Calculator', path: '/budget' },
    { name: 'Feedback', path: '/feedback' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center group">
            <img src="/images/logo.png" alt="Come to Sri Lanka Logo" className="h-16 w-auto transform group-hover:scale-105 transition-transform duration-300" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-2 rounded-full text-sm lg:text-base font-semibold transition-all duration-300 ${
                  isActive(link.path)
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-800'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth/User Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-blue-600 dark:text-blue-400 font-bold hover:text-blue-800 transition-colors bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full">
                    Admin Dashboard
                  </Link>
                )}
                <Link to="/my-bookings" className="text-gray-700 dark:text-gray-300 font-semibold hover:text-blue-600 transition-colors">
                  My Bookings
                </Link>
                <Link to="/profile" className="w-10 h-10 rounded-full border-2 border-blue-600 overflow-hidden hover:scale-105 transition-transform">
                  <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" alt="Avatar" className="w-full h-full object-cover" />
                </Link>
                <button onClick={onLogout} className="px-5 py-2 text-sm font-bold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 rounded-full transition-colors border border-red-200 dark:border-red-800">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="px-5 py-2 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                  Log in
                </Link>
                <Link to="/register" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-md shadow-blue-500/20 transition-transform transform hover:-translate-y-0.5">
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 focus:outline-none"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800 animate-fadeIn">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
               <Link
                 key={link.name}
                 to={link.path}
                 onClick={() => setIsOpen(false)}
                 className={`px-4 py-3 rounded-lg font-semibold ${
                   isActive(link.path) 
                     ? 'bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400' 
                     : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                 }`}
               >
                 {link.name}
               </Link>
              ))}
              
              <div className="border-t border-gray-200 dark:border-gray-700 my-2 pt-2">
                {user ? (
                  <>
                    <Link to="/profile" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-lg font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">My Profile</Link>
                    {user.role === 'admin' && (
                      <Link to="/admin" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-lg font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800">Admin Dashboard</Link>
                    )}
                    <Link to="/my-bookings" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-lg font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">My Bookings</Link>
                    <button onClick={() => { setIsOpen(false); onLogout(); }} className="w-full text-left px-4 py-3 mt-2 rounded-lg font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-gray-800">Logout</button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2 px-2 mt-2">
                    <Link to="/login" onClick={() => setIsOpen(false)} className="px-4 py-3 text-center bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white font-bold rounded-xl">Log In</Link>
                    <Link to="/register" onClick={() => setIsOpen(false)} className="px-4 py-3 text-center bg-blue-600 text-white font-bold rounded-xl shadow-md">Sign Up</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
