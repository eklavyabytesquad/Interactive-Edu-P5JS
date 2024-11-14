import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Moon, Sun, ChevronDown, Menu, X, Home, BookOpen, Brain, 
  Calculator, Database, Pencil, User, Settings, HelpCircle, 
  LogOut, BookOpen as Subjects, School
} from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  const subjects = {
    mathematics: ['Algebra', 'Trigonometry'],
    physics: ['Mechanics','Optics'],
    dsa: ['Arrays & Strings','Algorithms']
  };

  const navItems = [
    { 
      name: 'Dashboard', 
      path: '/dashboard', 
      icon: Home
    },
    {
      name: 'Subjects',
      path: '/subjects',
      icon: Subjects,
      dropdown: [
        {
          name: 'Mathematics',
          icon: Calculator,
          items: subjects.mathematics
        },
        {
          name: 'Physics',
          icon: Brain,
          items: subjects.physics
        },
        {
          name: 'DSA',
          icon: Database,
          items: subjects.dsa
        }
      ]
    },
    { 
      name: 'Profile', 
      path: '/profile', 
      icon: User,
      dropdown: ['My Account', 'Achievements', 'Progress Report', 'Settings']
    },
    { 
      name: 'Help Center', 
      path: '/help', 
      icon: HelpCircle,
      dropdown: ['FAQs', 'Support', 'Documentation', 'Contact Us']
    }
  ];

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const renderDropdownContent = (item) => {
    if (item.name === 'Subjects') {
      return item.dropdown.map((subject) => (
        <div key={subject.name} className="space-y-1">
          <div className="flex items-center px-4 py-2 text-gray-300">
            <subject.icon className="w-4 h-4 mr-2" />
            <span>{subject.name}</span>
          </div>
          <div className="ml-4">
            {subject.items.map((subItem) => (
              <Link
                key={subItem}
                to={`/${subject.name.toLowerCase()}/${subItem.replace(/\s+/g, '-').toLowerCase()}`}
                className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200 rounded-lg"
              >
                {subItem}
              </Link>
            ))}
          </div>
        </div>
      ));
    } else {
      return item.dropdown.map((subItem) => (
        <Link
          key={subItem}
          to={`${item.path}/${subItem.toLowerCase().replace(/\s+/g, '-')}`}
          className="block px-4 py-2 text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200 rounded-lg"
        >
          {subItem}
        </Link>
      ));
    }
  };

  return (
    <nav 
      className={`fixed left-0 h-screen bg-[#1E1E2D] text-white transition-all duration-500 ease-in-out ${
        isExpanded ? 'w-64' : 'w-20'
      } group z-50`}
    >
      {/* Toggle Button */}
      <div className="absolute -right-5 top-8 w-10 h-10 cursor-pointer"
           onClick={() => setIsExpanded(!isExpanded)}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur opacity-70"></div>
        <button
          className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg"
        >
          {isExpanded ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {/* Logo Section */}
      <div className="p-4 mb-6">
        <Link to="/dashboard" className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center transition-all duration-300">
            {isExpanded ? (
              <span className="text-white font-bold text-xl">W</span>
            ) : (
              <Pencil className="w-6 h-6 text-white" />
            )}
          </div>
          <span className={`text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent transition-all duration-300 ${
            isExpanded ? 'opacity-100' : 'opacity-0 w-0'
          }`}>
            WrongMath
          </span>
        </Link>
      </div>

      {/* Navigation Items */}
      <div className="px-3 space-y-2">
        {navItems.map((item) => (
          <div key={item.name} className="relative group/item">
            <button
              onClick={() => item.dropdown && toggleDropdown(item.name)}
              className={`w-full flex items-center px-3 py-3 rounded-lg transition-all duration-200 
                ${location.pathname === item.path ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20' : 'hover:bg-white/5'}
                relative group`}
            >
              <item.icon 
                className={`w-6 h-6 ${location.pathname === item.path ? 'text-blue-400' : 'text-gray-400'}`}
              />
              <span className={`ml-3 font-medium transition-all duration-300 ${
                isExpanded ? 'opacity-100' : 'opacity-0 absolute left-full ml-4'
              } whitespace-nowrap`}>
                {item.name}
              </span>
              {item.dropdown && isExpanded && (
                <ChevronDown className={`ml-auto transition-transform duration-300 ${
                  activeDropdown === item.name ? 'rotate-180' : ''
                }`} />
              )}
            </button>

            {/* Tooltip for collapsed state */}
            {!isExpanded && (
              <div className="absolute left-full ml-6 hidden group-hover/item:block px-3 py-2 bg-[#2A2A3C] rounded-lg whitespace-nowrap z-50">
                {item.name}
              </div>
            )}

            {/* Dropdown Menu */}
            {item.dropdown && activeDropdown === item.name && isExpanded && (
              <div className="mt-2 ml-4 space-y-1 bg-[#252533] rounded-lg p-2">
                {renderDropdownContent(item)}
              </div>
            )}
          </div>
        ))}

        {/* Logout Button */}
        <div className="relative group/item mt-4">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center px-3 py-3 rounded-lg transition-all duration-200 
              hover:bg-white/5 relative group`}
          >
            <LogOut className="w-6 h-6 text-gray-400" />
            <span className={`ml-3 font-medium transition-all duration-300 ${
              isExpanded ? 'opacity-100' : 'opacity-0 absolute left-full ml-4'
            } whitespace-nowrap`}>
              Logout
            </span>
          </button>
          {!isExpanded && (
            <div className="absolute left-full ml-6 hidden group-hover/item:block px-3 py-2 bg-[#2A2A3C] rounded-lg whitespace-nowrap z-50">
              Logout
            </div>
          )}
        </div>
      </div>

      {/* Theme Toggle */}
      <div className="absolute bottom-8 left-0 right-0 px-4">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="w-full h-12 relative group overflow-hidden rounded-xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 group-hover:from-blue-600/20 group-hover:to-purple-600/20 transition-all duration-500"></div>
          <div className="relative flex items-center justify-center space-x-2">
            <div className={`transition-all duration-500 transform ${isDarkMode ? 'rotate-0' : 'rotate-180'}`}>
              {isDarkMode ? (
                <Moon className="w-6 h-6 text-blue-400" />
              ) : (
                <Sun className="w-6 h-6 text-yellow-400" />
              )}
            </div>
            <span className={`transition-all duration-300 ${
              isExpanded ? 'opacity-100' : 'opacity-0 w-0'
            }`}>
              {isDarkMode ? 'Dark Mode' : 'Light Mode'}
            </span>
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;