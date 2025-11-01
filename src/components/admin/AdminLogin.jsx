import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import authService from '../../services/authService';
import '../user/Auth.css';

const AdminLogin = () => {
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
      console.log('Attempting admin login...');
      const response = await authService.adminLogin(formData);
      console.log('Login response:', response);
      
      // Create user data object
      const userData = {
        email: response.email,
        username: response.username,
        role: 'ADMIN',
      };
      
      console.log('Setting user data:', userData);
      
      // Update context
      login(userData);
      
      // Verify it was stored
      const storedUser = localStorage.getItem('user');
      console.log('Stored user:', storedUser);
      
      toast.success('Admin login successful!');
      
      // Navigate after a brief delay
      setTimeout(() => {
        console.log('Navigating to admin dashboard...');
        navigate('/admin/dashboard', { replace: true });
      }, 200);
      
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed');
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h2 className="auth-title">Admin Login</h2>
          <p className="auth-subtitle">Access your admin dashboard</p>

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
              <Link to="/admin/forgot-password" className="forgot-link">
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="auth-divider">
            <span>Need an admin account?</span>
          </div>

          <Link to="/admin/register" className="btn btn-secondary btn-block">
            Request Admin Access
          </Link>

          <div className="auth-links">
            <Link to="/user/login" className="auth-link">
              Login as User
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;