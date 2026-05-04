import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DemoPage from './pages/DemoPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import HistoryPage from './pages/HistoryPage';
import HelpPage from './pages/HelpPage';
import DashboardPage from './pages/DashboardPage';
import SharedSlideshowPage from './pages/SharedSlideshowPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './components/AdminRoute';

function App() {
  // Hydrate user from storage (prioritize sessionStorage)
  const storedUser = sessionStorage.getItem('user') || localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/demo" element={<DemoPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage user={user} />} />
      <Route path="/history" element={<HistoryPage uploadedFiles={[]} />} />
      <Route path="/help" element={<HelpPage />} />
      <Route path="/dashboard" element={<DashboardPage user={user} uploadedFiles={[]} />} />
      <Route path="/slideshow/:id" element={<SharedSlideshowPage />} />
      <Route path="/admin-login" element={<AdminLoginPage />} />
      <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      {/* Redirect unknown routes to landing */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
