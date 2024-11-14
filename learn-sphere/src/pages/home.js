import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, BookOpen, Brain, Code, Star, 
  Users, Trophy, Target, ChevronDown, 
  Sparkles, ScrollText, GraduationCap
} from 'lucide-react';

const Home = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach((elem) => {
      observer.observe(elem);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#151521] overflow-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-4 animate-fade-in">
              <Sparkles className="w-4 h-4 text-yellow-400 mr-2" />
              <span className="text-sm text-gray-300">Welcome to the Future of Learning</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight animate-fade-in-up">
              Learn{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient">
                Mathematics
              </span>
              <br />the Right Way
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
              Master mathematics, physics, and DSA with our interactive learning platform powered by advanced technology.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in-up animation-delay-400">
              <Link
                to="/login"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-xl font-medium hover:opacity-90 transition-all duration-300 flex items-center justify-center group shadow-lg shadow-blue-500/25 hover:shadow-purple-500/25"
              >
                Get Started
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <a
                href="#features"
                className="w-full sm:w-auto px-8 py-4 bg-white/5 backdrop-blur-sm text-white rounded-xl font-medium hover:bg-white/10 transition-all duration-300 flex items-center justify-center group border border-white/10"
              >
                Learn More
                <ChevronDown className="ml-2 group-hover:translate-y-1 transition-transform duration-300" />
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 animate-fade-in-up animation-delay-600">
              {[
                { icon: Users, label: 'Active Users', value: '10K+' },
                { icon: ScrollText, label: 'Lessons', value: '500+' },
                { icon: Trophy, label: 'Success Rate', value: '95%' },
                { icon: Target, label: 'Daily Practice', value: '2M+' }
              ].map((stat, index) => (
                <div key={index} className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                  <stat.icon className="w-6 h-6 text-gray-400 mb-2" />
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose Us?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Experience a revolutionary approach to learning with our cutting-edge platform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Mathematics",
                description: "Master algebra, calculus, geometry, and more with our comprehensive curriculum.",
                color: "blue",
                delay: 0
              },
              {
                icon: Brain,
                title: "Physics",
                description: "Understand mechanics, electromagnetics, and quantum physics through interactive lessons.",
                color: "purple",
                delay: 200
              },
              {
                icon: Code,
                title: "DSA",
                description: "Learn data structures and algorithms with hands-on coding practice.",
                color: "pink",
                delay: 400
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`group animate-on-scroll bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-${feature.color}-500/50 transition-all duration-500 hover:translate-y-[-4px]`}
              >
                <div className={`w-16 h-16 bg-${feature.color}-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-8 h-8 text-${feature.color}-400`} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative animate-on-scroll bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 p-8 md:p-12 rounded-3xl backdrop-blur-sm border border-white/10">
            <div className="absolute inset-0 bg-grid-pattern opacity-5 rounded-3xl"></div>
            <div className="relative">
              <div className="text-center max-w-3xl mx-auto">
                <GraduationCap className="w-12 h-12 text-white mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start Learning?</h2>
                <p className="text-gray-400 mb-8">Join thousands of students who are already mastering complex subjects with our platform.</p>
                <Link
                  to="/register"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-xl font-medium hover:opacity-90 transition-all duration-300 group"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;