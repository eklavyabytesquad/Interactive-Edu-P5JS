// src/pages/Dashboard.js
import React from 'react';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {};

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome, {user.name || 'User'}!</h1>
        <p className="text-gray-400">Here's an overview of your learning progress</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#252533] p-6 rounded-xl">
          <h3 className="text-gray-400 mb-2">Courses Completed</h3>
          <p className="text-3xl font-bold text-white">12</p>
        </div>
        <div className="bg-[#252533] p-6 rounded-xl">
          <h3 className="text-gray-400 mb-2">Hours Studied</h3>
          <p className="text-3xl font-bold text-white">48</p>
        </div>
        <div className="bg-[#252533] p-6 rounded-xl">
          <h3 className="text-gray-400 mb-2">Problems Solved</h3>
          <p className="text-3xl font-bold text-white">156</p>
        </div>
        <div className="bg-[#252533] p-6 rounded-xl">
          <h3 className="text-gray-400 mb-2">Current Streak</h3>
          <p className="text-3xl font-bold text-white">7 days</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-[#252533] rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { subject: 'Mathematics', topic: 'Calculus', time: '2 hours ago' },
            { subject: 'Physics', topic: 'Mechanics', time: '1 day ago' },
            { subject: 'DSA', topic: 'Binary Trees', time: '2 days ago' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-700 last:border-0">
              <div>
                <p className="text-white font-medium">{activity.subject}</p>
                <p className="text-gray-400 text-sm">{activity.topic}</p>
              </div>
              <span className="text-gray-400 text-sm">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#252533] rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Continue Learning</h2>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors">
              Continue Calculus Course
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-colors">
              Practice DSA Problems
            </button>
          </div>
        </div>
        <div className="bg-[#252533] rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Recommendations</h2>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors">
              Linear Algebra Basics
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 transition-colors">
              Array Algorithms
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;