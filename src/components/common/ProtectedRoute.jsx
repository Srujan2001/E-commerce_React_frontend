import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    console.log('ProtectedRoute - Current user:', user);
    console.log('ProtectedRoute - Required role:', role);
    console.log('ProtectedRoute - Current path:', location.pathname);
  }, [user, role, location]);

  if (loading) {
    return <LoadingSpinner />;
  }

  // Check if user exists
  if (!user) {
    console.log('No user found, redirecting to login');
    return <Navigate to={role === 'ADMIN' ? '/admin/login' : '/user/login'} replace />;
  }

  // Check if user has required role
  if (role && user.role !== role) {
    console.log(`User role mismatch. Expected: ${role}, Got: ${user.role}`);
    
    // Redirect to appropriate page based on user's actual role
    if (user.role === 'ADMIN') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (user.role === 'USER') {
      return <Navigate to="/products" replace />;
    }
    
    return <Navigate to="/" replace />;
  }

  console.log('Access granted');
  return children;
};

export default ProtectedRoute;