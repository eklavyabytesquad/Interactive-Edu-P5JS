import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#151521] flex items-center justify-center p-4 overflow-hidden">
      <div className="relative w-full max-w-6xl mx-auto">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 grid grid-cols-3 -skew-x-12 opacity-20">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transform 
                         translate-x-4 animate-pulse"
              style={{
                animationDelay: `${i * 0.1}s`,
                opacity: Math.random() * 0.7 + 0.3
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-4">
          {/* Main 404 Text */}
          <div className="relative mb-8 sm:mb-16 select-none">
            {/* Shadow Text */}
            <div className="text-[150px] sm:text-[200px] md:text-[300px] font-black text-white/5 leading-none">
              404
            </div>
            
            {/* Glitch Effect Text */}
            <div className="absolute inset-0 animate-pulse">
              <div className="text-[150px] sm:text-[200px] md:text-[300px] font-black text-transparent bg-clip-text 
                            bg-gradient-to-r from-blue-400 to-purple-600 leading-none">
                404
              </div>
            </div>

            {/* Small Glitch Overlay */}
            <div className="absolute inset-0 animate-[glitch_1s_infinite]">
              <div className="text-[150px] sm:text-[200px] md:text-[300px] font-black text-blue-500/30 leading-none 
                            hover:skew-x-2 hover:-skew-y-3 transition-transform duration-300">
                404
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-4 mb-8 sm:mb-16 relative">
            <h2 className="text-2xl sm:text-4xl font-bold text-white animate-fade-in">
              Oops! Page Not Found
            </h2>
            <p className="text-gray-400 max-w-md mx-auto text-sm sm:text-base animate-slide-up">
              Looks like you've ventured into the digital void. Don't worry, we can help you find your way back.
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            {/* Home Button */}
            <button
              onClick={() => navigate('/')}
              className="group relative px-8 py-3 w-full sm:w-auto overflow-hidden rounded-full 
                       bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold
                       transform hover:scale-105 transition-all duration-200 ease-out"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-purple-500 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out" />
              <span className="relative flex items-center justify-center gap-2">
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                  />
                </svg>
                Back to Home
              </span>
            </button>

            {/* Go Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="px-8 py-3 w-full sm:w-auto rounded-full border-2 border-white/10 text-white 
                       font-semibold hover:bg-white/5 transform hover:scale-105 
                       transition-all duration-200 ease-out"
            >
              Go Back
            </button>
          </div>
        </div>

        {/* Animated Circles in Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full mix-blend-overlay"
              style={{
                animation: `ping ${2 + i}s cubic-bezier(0, 0, 0.2, 1) infinite`,
                background: `radial-gradient(circle, rgba(59,130,246,${0.2 - i * 0.05}) 0%, rgba(147,51,234,${0.1 - i * 0.02}) 100%)`,
                width: `${400 + i * 100}px`,
                height: `${400 + i * 100}px`,
                left: `-${200 + i * 50}px`,
                top: `-${200 + i * 50}px`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/30 rounded-full"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 5}s linear infinite`,
              animationDelay: `-${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Add these keyframes to your global CSS file
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0% {
      transform: translateY(0) translateX(0);
    }
    50% {
      transform: translateY(-200px) translateX(100px);
    }
    100% {
      transform: translateY(-400px) translateX(0);
      opacity: 0;
    }
  }

  @keyframes glitch {
    0% {
      transform: translate(0);
    }
    20% {
      transform: translate(-2px, 2px);
    }
    40% {
      transform: translate(-2px, -2px);
    }
    60% {
      transform: translate(2px, 2px);
    }
    80% {
      transform: translate(2px, -2px);
    }
    100% {
      transform: translate(0);
    }
  }
`;
document.head.appendChild(style);

export default NotFound;