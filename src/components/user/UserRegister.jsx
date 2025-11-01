import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authService from '../../services/authService';
import './Auth.css';

const UserRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    gender: 'Male',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    toast.error('Passwords do not match');
    return;
  }

  // Enhanced password validation
  if (formData.password.length < 8) {
    toast.error('Password must be at least 8 characters');
    return;
  }

  if (!/[A-Z]/.test(formData.password)) {
    toast.error('Password must contain at least one uppercase letter');
    return;
  }

  if (!/\d/.test(formData.password)) {
    toast.error('Password must contain at least one number');
    return;
  }

  if (!/[@$!%*?&]/.test(formData.password)) {
    toast.error('Password must contain at least one special character (@$!%*?&)');
    return;
  }

  setLoading(true);
  // ... rest of the code
    try {
      const response = await authService.userRegister({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        address: formData.address,
        gender: formData.gender,
      });

      toast.success(response.message);
      navigate('/user/verify-otp', { state: { email: formData.email } });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">Join us today and start shopping!</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="form-input"
                required
                minLength={3}
              />
            </div>

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
                minLength={8}
              />
              <small className="form-hint">
                Must contain: 8+ chars, uppercase (A-Z), number (0-9), special char (@$!%*?&)
              </small>
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="form-input"
                rows="3"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="form-input"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Creating Account...' : 'Register'}
            </button>
          </form>

          <div className="auth-divider">
            <span>Already have an account?</span>
          </div>

          <Link to="/user/login" className="btn btn-secondary btn-block">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;