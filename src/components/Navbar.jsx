import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 text-xl font-bold text-blue-600">
              CarPassion
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="items-center hidden space-x-4 md:flex">
            <Link
              to="/"
              className={`px-3 py-2 text-sm font-medium ${
                location.pathname === '/' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Home
            </Link>
            
            {currentUser ? (
              <>
                <Link
                  to="/admin"
                  className={`px-3 py-2 text-sm font-medium ${
                    location.pathname.startsWith('/admin') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/admin/login"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                Admin Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 text-gray-700 rounded-md hover:text-blue-600 focus:outline-none"
            >
              {/* Hamburger icon */}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="pt-2 pb-3 space-y-1 bg-white shadow-lg md:hidden">
          <Link
            to="/"
            className={`block px-3 py-2 text-base font-medium ${
              location.pathname === '/' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
            }`}
            onClick={toggleMobileMenu}
          >
            Home
          </Link>
          
          {currentUser ? (
            <>
              <Link
                to="/admin"
                className={`block px-3 py-2 text-base font-medium ${
                  location.pathname.startsWith('/admin') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={toggleMobileMenu}
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  logout();
                  toggleMobileMenu();
                }}
                className="block w-full px-3 py-2 text-base font-medium text-left text-gray-700 hover:text-blue-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/admin/login"
              className={`block px-3 py-2 text-base font-medium ${
                location.pathname === '/admin/login' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
              onClick={toggleMobileMenu}
            >
              Admin Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;