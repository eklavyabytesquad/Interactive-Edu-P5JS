import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, Home, Info, Mail, LogIn, 
  UserPlus, Pencil, BookOpen, GraduationCap
} from 'lucide-react';

const TopNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Courses', path: '/courses', icon: BookOpen },
    { name: 'About Us', path: '/about', icon: Info },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-[#1E1E2D]/95 backdrop-blur-sm fixed w-full z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <Pencil className="w-5 h-5 text-white transform group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              WrongMath
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 ${
                  isActive(item.path)
                    ? 'bg-white/10 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}

            {/* Auth Buttons */}
            <div className="ml-6 flex items-center space-x-3">
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-lg flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white transition-all duration-300 transform hover:scale-105"
              >
                <UserPlus className="w-4 h-4" />
                <span>Register</span>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {isMenuOpen ? <X className="h-6 w-6 relative z-10" /> : <Menu className="h-6 w-6 relative z-10" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div 
          className={`md:hidden absolute left-0 right-0 bg-[#1E1E2D] border-b border-white/10 transition-all duration-300 ${
            isMenuOpen ? 'top-16 opacity-100' : '-top-96 opacity-0'
          }`}
        >
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg flex items-center space-x-2 transition-all duration-300 ${
                  isActive(item.path)
                    ? 'bg-white/10 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
            
            <div className="pt-4 space-y-2">
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                <div className="flex items-center space-x-2">
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </div>
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center"
              >
                <div className="flex items-center justify-center space-x-2">
                  <UserPlus className="w-4 h-4" />
                  <span>Register</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;