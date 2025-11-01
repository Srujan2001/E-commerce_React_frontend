import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import authService from '../../services/authService';
import './Auth.css';

const UserLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const response = await authService.userLogin(formData);
    
    // FIXED: Call login first to update context
    login({
      email: response.email,
      username: response.username,
      role: 'USER',
    });
    
    toast.success('Login successful!');
    
    // FIXED: Use setTimeout to ensure state updates before navigation
    setTimeout(() => {
      navigate('/products', { replace: true });
    }, 100);
  } catch (error) {
    toast.error(error.response?.data?.message || 'Login failed');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h2 className="auth-title">User Login</h2>
          <p className="auth-subtitle">Welcome back! Please login to your account.</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-footer">
              <Link to="/user/forgot-password" className="forgot-link">
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="auth-divider">
            <span>Don't have an account?</span>
          </div>

          <Link to="/user/register" className="btn btn-secondary btn-block">
            Create Account
          </Link>

          <div className="auth-links">
            <Link to="/admin/login" className="auth-link">
              Login as Admin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;