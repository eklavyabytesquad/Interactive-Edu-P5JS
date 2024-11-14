import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Home, UserPlus, ArrowRight } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  // Demo credentials
  const DEMO_USER = {
    email: 'test@test.com',
    password: 'test123'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (credentials.email === DEMO_USER.email && credentials.password === DEMO_USER.password) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify({
        name: 'Test User',
        email: DEMO_USER.email,
        role: 'user'
      }));
      
      navigate('/dashboard');
    } else {
      setError('Invalid credentials! Use test@test.com / test123');
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 bg-[#151521]">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-4 right-4 flex space-x-4">
        <Link 
          to="/"
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 text-white backdrop-blur-sm"
        >
          <Home size={18} />
          <span>Home</span>
        </Link>
        <Link 
          to="/register"
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 text-white backdrop-blur-sm"
        >
          <UserPlus size={18} />
          <span>Register</span>
        </Link>
      </div>

      {/* Login Form */}
      <div className="relative max-w-md w-full">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-lg rounded-2xl"></div>
        <div className="relative space-y-8 p-8 backdrop-blur-sm rounded-2xl border border-white/10">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
              <span className="text-white font-bold text-2xl">W</span>
            </div>
          </div>

          <div>
            <h2 className="text-center text-3xl font-extrabold text-white">
              Welcome Back
            </h2>
            <p className="mt-2 text-center text-gray-400">
              Sign in to continue your learning journey
            </p>
            {error && (
              <p className="mt-2 text-center text-sm text-red-400 bg-red-500/10 py-2 px-4 rounded-lg">
                {error}
              </p>
            )}
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Email address"
                  value={credentials.email}
                  onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex items-center justify-center py-3 px-4 text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-blue-300 group-hover:text-blue-200" />
                </span>
                Sign in
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

            <div className="text-center space-y-2">
              <p className="text-sm text-gray-400">Demo credentials:</p>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm text-gray-300">Email: test@test.com</p>
                <p className="text-sm text-gray-300">Password: test123</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;