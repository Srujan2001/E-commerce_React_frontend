import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AuthContext initializing...');
    const currentUser = authService.getCurrentUser();
    console.log('Current user from storage:', currentUser);
    
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    console.log('User state changed:', user);
  }, [user]);

  const login = (userData) => {
    console.log('Login called with:', userData);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    console.log('User set in context and localStorage');
  };

  const logout = () => {
    console.log('Logout called');
    authService.logout();
    setUser(null);
  };

  const isAuthenticated = () => {
    const authenticated = !!user || authService.isAuthenticated();
    console.log('isAuthenticated:', authenticated);
    return authenticated;
  };

  const hasRole = (role) => {
    if (user) {
      return user.role === role;
    }
    const currentUser = authService.getCurrentUser();
    return currentUser?.role === role;
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    hasRole,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;