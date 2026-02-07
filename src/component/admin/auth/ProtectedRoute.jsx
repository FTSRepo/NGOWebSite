// ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    // Redirect to /admin (your login page)
    return <Navigate to="/admin" replace />;
  }
  
  return children;
};

export default ProtectedRoute;