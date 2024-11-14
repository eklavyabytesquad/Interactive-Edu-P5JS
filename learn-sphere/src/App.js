import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardNavbar from './components/dashboardnavbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Home from './pages/home';
import TopNavbar from './components/topnavbar';
import NotFound from './pages/NotFound';
import Algebra from './pages/mathematics/algebra';
import Trigonometry from './pages/mathematics/trignometry.js';
import MathematicsHome from './pages/mathematics/mathematicshome.js';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#151521]">
      <DashboardNavbar />
      <main className="flex-1 p-8 transition-all duration-500 ml-20 lg:ml-64">
        {children}
      </main>
    </div>
  );
};

const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#151521]">
      <TopNavbar />
      <main>
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <PublicLayout>
            <Home />
          </PublicLayout>
        } />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        {/* Mathematics Routes */}
        <Route path="/mathematics/*" element={
          <ProtectedRoute>
            <DashboardLayout>
              <Routes>
                <Route index element={<MathematicsHome />} />
                <Route path="algebra" element={<Algebra />} />
                <Route path="trigonometry" element={<Trigonometry />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        {/* Physics Routes */}
        <Route path="/physics/*" element={
          <ProtectedRoute>
            <DashboardLayout>
              <Routes>
                <Route index element={<div className="text-white">Physics Home</div>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        {/* DSA Routes */}
        <Route path="/dsa/*" element={
          <ProtectedRoute>
            <DashboardLayout>
              <Routes>
                <Route index element={<div className="text-white">DSA Home</div>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        {/* 404 Route - This should be the last route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;